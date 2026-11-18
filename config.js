/*
 * Cấu hình thiệp cưới — sửa file này, không cần động vào HTML.
 * Để trống ("") mục nào thì phần đó giữ chỗ trống hoặc tự ẩn.
 */
window.WEDDING = {
  // Link Web App của Google Apps Script (dạng https://script.google.com/macros/s/.../exec).
  // Xem hướng dẫn trong README.md. Để trống thì form báo "chưa nối Google Sheet".
  sheetUrl: "https://script.google.com/macros/s/AKfycbxe0tVDOx-B5RrByZHYi4JkLSp45aJsfiv7VGeGZzqyArlKolVrG5ztA1ASkpFJurvoiw/exec",

  // Hạn khách phản hồi, ví dụ "25.11.2026". Để trống thì câu nhắc hạn tự ẩn.
  rsvpDeadline: "",

  // Mừng cưới — mỗi người một mã QR.
  // Ảnh QR đặt vào thư mục img, ví dụ "img/qr-chu-re.png". Để trống thì hiện ô giữ chỗ.
  groomQr: "img/qr-chu-re.png",
  groomBank: "Vietcombank",        // ví dụ "Vietcombank"
  groomAccount: "0491000090213",     // số tài khoản chú rể
  groomHolder: "LE TU ANH",      // ví dụ "LE TU ANH"

  brideQr: "img/qr-co-dau.png",
  brideBank: "Vietcombank",
  brideAccount: "0501000226937",
  brideHolder: "TRUONG NGOC KIM CHAU"       // ví dụ "TRUONG NGOC KIM CHAU"
};
