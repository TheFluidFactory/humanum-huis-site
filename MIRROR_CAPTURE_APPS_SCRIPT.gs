/**
 * Humanum Huis — Human Readiness Mirror capture
 *
 * Bound to the Google Sheet created for this project.
 * This script receives an explicitly opted-in browser submission and writes one row.
 * It does not send email, expose the spreadsheet, or retain IP addresses in the sheet.
 */

const SPREADSHEET_ID = '1sJ4BNBubDBdvG7qui-iU6aMfghMyIplYhAsGNrFs280';
const SHEET_NAME = 'Responses';

function doGet() {
  return output_({ ok: true, service: 'Humanum Huis Mirror capture' });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return output_({ ok: false, error: 'Invalid payload' });
  }

  // Quietly accept obvious bot submissions without writing a row.
  if (safe_(data.website)) return output_({ ok: true });
  if (data.event !== 'human_readiness_mirror_response' || data.consent_to_store !== true) {
    return output_({ ok: false, error: 'Consent required' });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Responses sheet not found');

    const gaps = data.gaps || {};
    sheet.appendRow([
      new Date(),
      safe_(data.response_id),
      'yes',
      safe_(data.contact_permission) === 'true' ? 'yes' : 'no',
      safe_(data.email),
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
      safe_(data.mirror_version)
    ]);
  } catch (err) {
    return output_({ ok: false, error: 'Could not save response' });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }

  return output_({ ok: true });
}

function safe_(value) {
  return String(value == null ? '' : value).slice(0, 45000);
}

function json_(value) {
  try { return JSON.stringify(value == null ? {} : value).slice(0, 45000); }
  catch (err) { return ''; }
}

function output_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
