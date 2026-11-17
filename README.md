# Thiệp cưới Tú Anh & Kim Châu

Trang tĩnh, không cần build. Mở `index.html` bằng một web server bất kỳ là chạy.

| File | Nội dung |
|---|---|
| `index.html` | Mẫu editorial — trang chính |
| `toi-gian.html` | Mẫu tối giản (trên Vercel mở bằng `/toi-gian`) |
| `editorial.html` | Chỉ chuyển hướng link cũ `/editorial` về trang chính |
| `config.js` | Link Google Sheet, hạn phản hồi, mã QR và tài khoản của chú rể, cô dâu |
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

- **Vercel (link chính):** https://tuanh-kimchau.vercel.app — project `tuanh-kimchau`, nối với repo này; mỗi lần push lên main là tự cập nhật.
- **GitHub Pages (dự phòng):** https://anhtule.github.io/thiep-cuoi/ — vẫn chạy song song.
- **Netlify:** kéo thả cả thư mục vào app.netlify.com/drop.

Nếu đổi tên miền, sửa dòng `og:image` và `og:url` trong hai file HTML theo tên miền mới, để Zalo/Messenger hiện ảnh khi gửi link.

## 3. Link mời theo tên khách

Thêm `?to=` vào cuối link:

```
https://tuanh-kimchau.vercel.app/?to=Anh Nam và gia đình
https://tuanh-kimchau.vercel.app/toi-gian?to=Cô Lan
```

Bìa hiện "Kính mời …" và ô họ tên trong form được điền sẵn. Link không có `?to=` thì dòng "Kính mời" tự ẩn.

## 4. Mã QR mừng cưới

Mỗi người một mã. Đặt ảnh QR vào `img/` (vd `img/qr-chu-re.png`, `img/qr-co-dau.png`), rồi điền trong `config.js`:

- Chú rể: `groomQr`, `groomBank`, `groomAccount`, `groomHolder`
- Cô dâu: `brideQr`, `brideBank`, `brideAccount`, `brideHolder`

Có số tài khoản thì hiện nút "Sao chép số TK" để khách dán vào app ngân hàng.

## 5. Sửa nội dung

- Thông tin trong `config.js`: sửa rồi deploy lại. Khi sửa `config.js` hoặc `app.js`, tăng số `?v=` ở cuối dòng `<script src=...>` trong hai file HTML (vd `?v=4`) để điện thoại khách tải bản mới ngay, không dùng bản cũ trong bộ nhớ đệm.
- Thay ảnh: dùng tên file mới (vd `bia-v2.jpg`) thay vì ghi đè, để điện thoại không giữ ảnh cũ trong bộ nhớ đệm.
- Khách đã mở link chỉ cần tải lại trang là thấy bản mới.
