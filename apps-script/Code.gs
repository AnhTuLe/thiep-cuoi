/**
 * Nhận phản hồi "Xác nhận tham dự" từ thiệp cưới và ghi vào Google Sheet.
 * Dán toàn bộ file này vào Extensions › Apps Script của Google Sheet, rồi Deploy as Web app.
 */
var SHEET_NAME = 'Phản hồi';
var HEADERS = ['Thời gian', 'Họ và tên', 'Tham dự', 'Số người', 'Lời nhắn', 'Tên trên link mời', 'Mẫu thiệp'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    var p = (e && e.parameter) || {};
    sheet.appendRow([
      new Date(),
      clean(p.fullname, 80),
      clean(p.attend, 10),
      clean(p.guests, 10),
      clean(p.message, 1000),
      clean(p.invited, 60),
      clean(p.template, 20)
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Mở link Web App trên trình duyệt để kiểm tra script đang chạy.
function doGet() {
  return json({ ok: true, message: 'Web App đang hoạt động' });
}

// Cắt độ dài và chặn chuỗi bị Sheet hiểu thành công thức (=, +, -, @).
function clean(value, max) {
  var s = String(value == null ? '' : value).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
