/**
 * Humanum Huis — Human Readiness Mirror contact lead capture
 *
 * Bound to the private response Google Sheet. The public website calls this
 * web app only after a visitor explicitly asks Humanum Huis to contact them.
 * Every accepted request creates one lead row and sends a notification email
 * to flourish@humanumhuis.com. Anonymous Mirror results are never stored.
 */

const SPREADSHEET_ID = '1sJ4BNBubDBdvG7qui-iU6aMfghMyIplYhAsGNrFs280';
const SHEET_NAME = 'Responses';
const NOTIFY_EMAIL = 'flourish@humanumhuis.com';

const HEADERS = [
  'Submitted at (UTC)',
  'Response ID',
  'Contact-request consent',
  'Contact requested',
  'Email',
  'Name',
  'Organization',
  'Archetype',
  'Ladder level',
  'Strategic clarity gap',
  'Trust & safety gap',
  'Imagination gap',
  'Governance gap',
  'Practice gap',
  'Answer summary (JSON)',
  'Result summary (JSON)',
  'Source URL',
  'Mirror version',
  'Notification status',
  'Follow-up status'
];

function doGet() {
  return output_({ ok: true, service: 'Humanum Huis Mirror contact capture' });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return output_({ ok: false, error: 'Invalid payload' });
  }

  // Honeypot: quietly discard obvious bots without a row or email.
  if (safe_(data.website)) return output_({ ok: true, ignored: true });

  const email = normalizeEmail_(data.email);
  const validRequest =
    data.event === 'human_readiness_mirror_contact_request' &&
    data.contact_requested === true &&
    data.contact_consent === true &&
    isValidEmail_(email);

  if (!validRequest) {
    return output_({ ok: false, error: 'Contact request, consent and a valid email are required' });
  }

  const responseId = safe_(data.response_id);
  if (!responseId) return output_({ ok: false, error: 'Missing response ID' });

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getSheet_();

    // Prevent duplicated rows and duplicate Parker notifications if a visitor retries.
    if (responseExists_(sheet, responseId)) {
      return output_({ ok: true, duplicate: true });
    }

    const gaps = data.gaps || {};
    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([[
      new Date(),
      responseId,
      'yes',
      'yes',
      email,
      safe_(data.name),
      safe_(data.organization),
      safe_(data.archetype),
      safe_(data.ladder_level),
      safe_(gaps.clarity),
      safe_(gaps.trust),
      safe_(gaps.imagination),
      safe_(gaps.governance),
      safe_(gaps.practice),
      json_(data.answers),
      json_(data.result),
      safe_(data.source_url),
      safe_(data.mirror_version),
      'Sending…',
      'New'
    ]]);

    try {
      sendLeadNotification_(data, email, sheet, row);
      sheet.getRange(row, 19).setValue('Sent ' + timestamp_());
    } catch (mailError) {
      sheet.getRange(row, 19).setValue('Notification failed — check Apps Script Executions');
      throw mailError;
    }
  } catch (err) {
    return output_({ ok: false, error: 'Could not save contact request' });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }

  return output_({ ok: true });
}

function getSheet_() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Responses sheet not found');

  // Keeps the private Sheet self-documenting; safe because the current sheet
  // has no lead rows yet. Existing rows are never changed.
  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const headersNeedUpdate = HEADERS.some((header, index) => existing[index] !== header);
  if (headersNeedUpdate) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function responseExists_(sheet, responseId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  return !!sheet
    .getRange(2, 2, lastRow - 1, 1)
    .createTextFinder(responseId)
    .matchEntireCell(true)
    .findNext();
}

function sendLeadNotification_(data, email, sheet, row) {
  const name = safe_(data.name) || 'A new Mirror participant';
  const organization = safe_(data.organization) || 'Not provided';
  const archetype = safe_(data.archetype) || 'Not available';
  const ladder = safe_(data.ladder_level) || 'Not available';
  const primaryGap = primaryGap_(data.gaps || {});
  const summary = safe_((data.result || {}).executive_summary);
  const rowUrl = SpreadsheetApp.openById(SPREADSHEET_ID).getUrl() +
    '#gid=' + sheet.getSheetId() + '&range=A' + row;
  const subject = 'New Human Readiness Mirror contact request — ' + (safe_(data.name) || email);
  const plain = [
    'A visitor has asked Humanum Huis to contact them about their Mirror result.',
    '',
    'Name: ' + name,
    'Email: ' + email,
    'Organization: ' + organization,
    'Archetype: ' + archetype,
    'Human Readiness Ladder: ' + ladder,
    'Primary gap: ' + primaryGap,
    '',
    'Executive summary:',
    summary || 'Not available',
    '',
    'Open the private response record: ' + rowUrl
  ].join('\n');

  const html = [
    '<p>A visitor has asked <strong>Humanum Huis</strong> to contact them about their Mirror result.</p>',
    '<table cellpadding="6" cellspacing="0" border="0">',
    row_('Name', name),
    row_('Email', email),
    row_('Organization', organization),
    row_('Archetype', archetype),
    row_('Human Readiness Ladder', ladder),
    row_('Primary gap', primaryGap),
    '</table>',
    summary ? '<p><strong>Executive summary</strong><br>' + escapeHtml_(summary) + '</p>' : '',
    '<p><a href="' + rowUrl + '">Open the private response record in Google Sheets</a></p>',
    '<p style="color:#666;font-size:12px">Reply to this email to contact the participant directly. Their full answer pattern stays in the private Sheet.</p>'
  ].join('');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: plain,
    htmlBody: html,
    replyTo: email,
    name: 'Humanum Huis — Mirror'
  });
}

function sendTestNotification() {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'Test — Humanum Huis Mirror lead notification',
    body: 'This is a test. If you received it, the Mirror contact notification is configured correctly.',
    name: 'Humanum Huis — Mirror'
  });
}

function primaryGap_(gaps) {
  const labels = {
    clarity: 'Strategic clarity',
    trust: 'Trust & safety',
    imagination: 'Imagination',
    governance: 'Governance',
    practice: 'Practice gap'
  };
  const entries = Object.keys(labels).map(key => [key, Number(gaps[key] || 0)]);
  entries.sort((a, b) => b[1] - a[1]);
  return (labels[entries[0][0]] || 'Not available') + ' (' + entries[0][1] + '/10)';
}

function normalizeEmail_(value) {
  return safe_(value).trim().toLowerCase();
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function safe_(value) {
  return String(value == null ? '' : value).slice(0, 45000);
}

function json_(value) {
  try { return JSON.stringify(value == null ? {} : value).slice(0, 45000); }
  catch (err) { return ''; }
}

function timestamp_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function row_(label, value) {
  return '<tr><td style="color:#666">' + escapeHtml_(label) + '</td><td><strong>' + escapeHtml_(value) + '</strong></td></tr>';
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function output_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
