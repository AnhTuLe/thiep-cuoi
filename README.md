# Thiệp cưới Tú Anh & Kim Châu

Trang tĩnh, không cần build. Mở `index.html` bằng một web server bất kỳ là chạy.

| File | Nội dung |
|---|---|
| `index.html` | Mẫu 1 — tối giản |
| `editorial.html` | Mẫu 2 — editorial (trên Vercel mở được bằng `/editorial`) |
| `config.js` | Link Google Sheet, hạn phản hồi, mã QR, thông tin tài khoản |
| `app.js` | Màn mở thiệp, tên khách, xem ảnh lớn, gửi form |
| `img/` | Ảnh đã nén cho điện thoại |
| `apps-script/Code.gs` | Script nhận form, dán vào Google Sheet |

## 1. Nối form với Google Sheet

1. Tạo một Google Sheet mới.
2. Vào **Extensions › Apps Script**, xoá code mẫu, dán toàn bộ `apps-script/Code.gs`, bấm Save.
3. **Deploy › New deployment** → chọn loại **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Bấm Deploy, cấp quyền (Google sẽ cảnh báo "unverified app" vì là script của bạn: chọn Advanced › Go to … ).
5. Copy link Web App (kết thúc bằng `/exec`), dán vào `sheetUrl` trong `config.js`.
6. Mở link `/exec` trên trình duyệt: thấy `"ok":true` là script chạy.

Phản hồi ghi vào tab **Phản hồi** (tự tạo ở lần gửi đầu): thời gian, họ tên, tham dự, số người, lời nhắn, tên trên link mời, mẫu thiệp.

Khi sửa `Code.gs` sau này: **Deploy › Manage deployments › Edit › Version: New version**. Làm vậy thì link `/exec` giữ nguyên; tạo "New deployment" sẽ ra link mới.

## 2. Host

- **GitHub Pages (đang dùng):** https://anhtule.github.io/thiep-cuoi/ — mỗi lần push lên nhánh main là trang tự cập nhật sau khoảng 1 phút.
- **Vercel:** đẩy thư mục này lên một repo GitHub, Import vào Vercel (Framework: Other). Mỗi lần `git push` là trang tự cập nhật.
- **Netlify:** kéo thả cả thư mục vào app.netlify.com/drop.

Sau khi có tên miền, sửa dòng `og:image` trong hai file HTML thành link tuyệt đối, ví dụ `https://ten-mien/img/p06.jpg`, để Zalo/Messenger hiện ảnh khi gửi link.

## 3. Link mời theo tên khách

Thêm `?to=` vào cuối link:

```
https://ten-mien/?to=Anh Nam và gia đình
https://ten-mien/editorial?to=Cô Lan
```

Bìa hiện "Kính mời …" và ô họ tên trong form được điền sẵn. Link không có `?to=` thì dòng "Kính mời" tự ẩn.

## 4. Sửa nội dung

- Thông tin trong `config.js`: sửa rồi deploy lại.
- Thay ảnh: dùng tên file mới (vd `bia-v2.jpg`) thay vì ghi đè, để điện thoại không giữ ảnh cũ trong bộ nhớ đệm.
- Khách đã mở link chỉ cần tải lại trang là thấy bản mới.
