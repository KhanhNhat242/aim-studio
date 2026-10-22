<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AIM Studio — Quy tắc dự án (BẮT BUỘC)

Mọi thay đổi (code, nội dung, asset, cấu hình) phải tuân thủ các quy tắc dưới đây. Nếu yêu cầu mới mâu thuẫn với quy tắc, **dừng lại và hỏi** thay vì tự quyết.

## 1. Nguồn sự thật

- `docs/REQUIREMENTS.md` là nguồn sự thật về nghiệp vụ. **Đọc nó trước khi làm bất kỳ việc gì.**
- `docs/DESIGN.md` là chuẩn giao diện (màu token, khoảng cách, nhịp nền, thành phần, chuyển động, ảnh). Mọi UI mới phải theo đúng file này và tái sử dụng `shell`, `section-y`, `SectionHeading`, `data-reveal` thay vì tự đặt giá trị mới.
- Yêu cầu thay đổi → sửa `docs/REQUIREMENTS.md` + ghi "Nhật ký thay đổi" **trước**, rồi mới sửa code.
- Mọi dữ liệu doanh nghiệp (tên, slogan, SĐT, Zalo, địa chỉ, Facebook, Maps, danh sách 6 dịch vụ) chỉ được khai báo **một lần** trong `lib/site-config.ts` và import ở mọi nơi. Cấm hardcode các giá trị này trong component.

## 2. Nội dung — không bịa

- Chỉ dùng thông tin có trong `docs/REQUIREMENTS.md`. Không tự tạo: giá, giờ mở cửa, email, số liệu thống kê, đánh giá khách, tên nhân viên, giải thưởng, năm thành lập.
- Dịch vụ: đúng 6 mục, đúng tên, đúng thứ tự — Beauty, Concept, Profile, Ngoại cảnh, Gia đình, Chụp bầu.
- Slogan giữ nguyên văn: "Hãy để AIM lưu giữ thanh xuân của bạn".
- Toàn bộ chữ trên web bằng **Tiếng Việt có dấu**, đúng chính tả ("Beauty", không phải "Beuty"). `<html lang="vi">`.
- Giọng văn: giàu cảm xúc, ấm áp, chuyên nghiệp; không khoa trương ("số 1", "rẻ nhất").
- Thiếu dữ liệu → hiển thị theo bảng mục 9 của REQUIREMENTS hoặc để `TODO` trong code; không điền nội dung giả.

## 3. Phạm vi

- Chỉ 4 trang: `/`, `/about`, `/services`, `/contact` + Header + Footer.
- Không thêm giỏ hàng, thanh toán, đăng nhập, đặt lịch có backend, đa ngôn ngữ, blog, bảng giá khi chưa được xác nhận và ghi vào REQUIREMENTS.
- Không làm form/nút "giả" (gửi không tới đâu, link `#`). Mọi CTA phải dẫn tới `tel:`, Zalo, Facebook hoặc Google Maps thật.

## 4. Thiết kế

- Bảng màu chỉ gồm trắng, xám, đen. Khai báo dưới dạng token trong `app/globals.css` (`@theme`) và dùng token; không dùng mã màu rời rạc (`text-[#xxxxxx]`) trong component. Cấm màu nhấn khác (teal, xanh, be/kem...).
- Một theme sáng cố định — không tự đổi sang dark mode theo hệ điều hành.
- Phong cách clean, chuyên nghiệp: nhiều khoảng trắng, ảnh là trọng tâm, hiệu ứng tinh tế (tôn trọng `prefers-reduced-motion`).
- Responsive bắt buộc: kiểm tra ở 375px, 768px, 1280px; không có cuộn ngang.
- Ảnh: dùng `next/image`, có `alt` tiếng Việt mô tả đúng. Chỉ dùng logo/ảnh thật của AIM (thư mục Drive trong REQUIREMENTS); chưa có ảnh thì placeholder xám + `TODO`, không dùng ảnh stock giả làm ảnh studio.
- Asset đặt trong `public/images/`, tên file kebab-case có nghĩa (vd. `logo-mark.jpg`, `service-beauty-01.jpg`).

## 5. Kỹ thuật

- Next.js 16.4 (App Router), React 19.3, Tailwind CSS v4, Ant Design v6, TypeScript strict. Trước khi dùng API Next.js nào, đọc tài liệu tương ứng trong `node_modules/next/dist/docs/` (xem khối ở đầu file).
- `cacheComponents` đang bật: truy cập runtime API (`cookies`, `headers`, `searchParams`, `usePathname`...) phải nằm trong `<Suspense>`.
- Mặc định Server Component. Chỉ thêm `'use client'` cho component thật sự cần state/event/hook trình duyệt, và đặt ở mức component nhỏ nhất (không đặt cho cả page).
- Ưu tiên Tailwind; chỉ dùng Ant Design khi component phức tạp thật sự cần, và phải override theo bảng màu trắng/xám/đen. Giữ thứ tự layer `theme, base, antd, components, utilities` trong `globals.css`.
- Mỗi trang khai báo `metadata` (title, description tiếng Việt) theo nội dung REQUIREMENTS.
- Cấu trúc: `app/` (route), `components/` (UI dùng chung, PascalCase), `lib/` (config, tiện ích). Import qua alias `@/`.
- Viết code giống code xung quanh: cùng cách đặt tên, mật độ comment, idiom. Comment bằng tiếng Việt như code hiện có.
- Không thêm thư viện mới khi chưa hỏi.

## 6. Định nghĩa "Xong"

Một thay đổi chỉ được coi là xong khi:
1. `npm run lint` và `npm run build` chạy không lỗi.
2. Nội dung khớp `docs/REQUIREMENTS.md` (đối chiếu SĐT, địa chỉ, link, tên dịch vụ, slogan).
3. Hiển thị đúng ở mobile/tablet/desktop, mọi link/CTA bấm được và đúng đích.
4. Nếu thay đổi phạm vi hoặc nội dung → đã cập nhật REQUIREMENTS (kèm nhật ký).
