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

  // Mừng cưới
  qrImage: "",          // ví dụ "img/qr.png" (đặt file ảnh mã QR vào thư mục img)
  bankName: "",         // ví dụ "Vietcombank"
  bankAccount: "",      // số tài khoản
  bankHolder: ""        // tên chủ tài khoản
};
