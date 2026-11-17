/*
 * Cấu hình thiệp cưới — sửa file này, không cần động vào HTML.
 * Để trống ("") mục nào thì phần đó giữ chỗ trống hoặc tự ẩn.
 */
window.WEDDING = {
  // Link Web App của Google Apps Script (dạng https://script.google.com/macros/s/.../exec).
  // Xem hướng dẫn trong README.md. Để trống thì form báo "chưa nối Google Sheet".
  sheetUrl: "",

  // Hạn khách phản hồi, ví dụ "25.11.2026". Để trống thì câu nhắc hạn tự ẩn.
  rsvpDeadline: "",

  // Mừng cưới — mỗi người một mã QR.
  // Ảnh QR đặt vào thư mục img, ví dụ "img/qr-chu-re.png". Để trống thì hiện ô giữ chỗ.
  groomQr: "",
  groomBank: "",        // ví dụ "Vietcombank"
  groomAccount: "",     // số tài khoản chú rể
  groomHolder: "",      // ví dụ "LE TU ANH"

  brideQr: "",
  brideBank: "",
  brideAccount: "",
  brideHolder: ""       // ví dụ "TRUONG NGOC KIM CHAU"
};
