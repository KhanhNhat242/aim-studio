# AIM Studio — Hệ thiết kế (Editorial Magazine)

> Chuẩn giao diện bắt buộc cho mọi trang/section. Đi kèm `docs/REQUIREMENTS.md` (nội dung) và `AGENTS.md` (rules).
> Tinh thần: web là **phòng triển lãm trắng – xám – đen**; màu sắc duy nhất đến từ **ảnh thật** của studio. Bố cục bất đối xứng, nhiều khoảng trắng, "Ảnh lớn – Chữ chắt lọc".

## 1. Màu (token trong `app/globals.css` → `@theme`)

| Token | Mã | Dùng cho |
|---|---|---|
| `paper` | `#FFFFFF` | Nền trắng, chữ trên nền đen |
| `smoke` | `#F4F4F5` | Nền xám khói (section xen kẽ), placeholder ảnh |
| `line` | `#E4E4E7` | Đường kẻ, viền mặc định |
| `silver` | `#A1A1AA` | Chữ phụ trên nền đen, số thứ tự |
| `mute` | `#71717A` | Chữ mô tả trên nền sáng |
| `graphite` | `#3F3F46` | Chữ nhấn phụ (vd. chữ nghiêng trong tiêu đề) |
| `ink` | `#09090B` | Chữ chính, nút chính, nền CTA cuối trang |

- Dùng class `bg-paper`, `text-ink`, `border-paper/10`… **Không** dùng `text-[#…]` hay bảng màu Tailwind khác.
- Không có dark mode. Bản đồ nhúng được lọc `grayscale`.
- Màu bôi đen (selection) mặc định: nền `ink`, chữ `paper`. Mọi khối **nền đen** phải thêm `selection:bg-paper selection:text-ink` để chữ bôi đen không lẫn vào nền.

## 2. Chữ

- Tiêu đề: `font-display` (Playfair Display, có dấu tiếng Việt). Chữ nghiêng `italic text-graphite` để nhấn 1–2 từ.
- Nội dung: `font-sans` (Be Vietnam Pro).
- Nhãn nhỏ (eyebrow/nút/menu): `text-[11px]–[13px] uppercase tracking-[0.16em–0.32em]`.
- Tiêu đề section dùng component `SectionHeading` (eyebrow → tiêu đề → mô tả), có `text-balance` để tránh chữ mồ côi.

## 3. Khoảng cách

| Vị trí | Mobile | Tablet | Desktop | Cách dùng |
|---|---|---|---|---|
| Đệm dọc section | 64px | 80px | 112px | utility `section-y` |
| Tiêu đề → nội dung | 48px | 48px | 64px | `mb-12 lg:mb-16` |
| Khe lưới thẻ/ảnh | 24px | 24px | 40px | `gap-6 lg:gap-10` |
| Lệch tầng cột giữa | — | — | 48px | `lg:mt-12` (cột 2 của lưới 3 cột) |
| Khung nội dung | 16px | 24px | 32px lề, tối đa 1280px | utility `shell` |

## 4. Nhịp nền trang chủ

`Hero (trắng)` → `Giới thiệu/USP (smoke)` → `Dịch vụ (trắng)` → `Lookbook (smoke)` → `Liên hệ (ink)` → `Footer (ink)`.
Section mới phải giữ nhịp xen kẽ, không đặt 2 section cùng nền cạnh nhau (trừ Liên hệ + Footer).

## 5. Thành phần

- **Header**: sticky, `bg-paper/85` + blur, logo chữ "A" + wordmark AIM/STUDIO, 4 mục menu, nút "Đặt lịch ngay" (gọi hotline). Viền dưới chỉ hiện khi đã cuộn.
- **Hero** (bố cục "người mẫu đứng giữa"): cao đúng 1 màn hình (`clamp(40rem, 100svh - header, 55rem)`), lưới 3 cột `[chữ trái | người mẫu | chữ phải]`.
  - Slogan nguyên văn tách đôi, chữ serif cỡ lớn 2 tông: trái "Hãy để AIM" (ink) / "lưu giữ" (mute); phải "*thanh xuân*" (mute, nghiêng) / "của bạn" (ink). Người mẫu (`hero-img.png`, PNG tách nền) đè lên chữ, logo "A" mờ 6% phía sau thay cho vệt cọ.
  - Trái dưới: mô tả + 2 CTA + hàng số liệu **thật** (số dịch vụ, số hotline, số nhà) — cấm số liệu bịa kiểu "120K+", "4.9★".
  - Phải: huy hiệu tròn chữ chạy vòng, dòng 6 dịch vụ in nghiêng, thẻ bộ ảnh "Party at AIM Studio" dẫn tới Lookbook.
  - Mobile: chữ → người mẫu → mô tả/CTA → số liệu (dùng `contents` + `order-*`, nhớ `lg:order-none`).
- **Nút**: chính = nền `ink` chữ `paper`; phụ = nền `paper` viền `ink`. Hover đảo màu, `duration-300`. Không bo góc.
- **Thẻ dịch vụ**: ảnh 3:4, số thứ tự `01–06`, hover phóng ảnh `scale-104` trong 500ms + đổi sang ảnh thứ 2 (nếu có) + nút "Liên hệ để nhận báo giá" chuyển nền đen.
- **Placeholder ảnh**: nền `smoke`, khung viền trong, logo "A" mờ 8%, tên dịch vụ serif nghiêng, nhãn "Ảnh đang cập nhật". Kèm `TODO` trong `lib/site-config.ts`.
- **Lookbook**: album cột so le (mỗi cột bắt đầu ở độ cao khác nhau, chân cột lệch). Desktop 4 cột `[2,3,3,2]` = 9 ảnh, mobile 2 cột = 7 ảnh, khung xen kẽ 3:4 / 4:5; ô cuối cột phải là "Xem thêm" (3:4, viền đứt nét, số "+N"); bấm ảnh hoặc ô "Xem thêm" mở popup xem toàn bộ (Esc, ← →). Dữ liệu ảnh ở `lib/lookbook-photos.ts`.
- **Điểm mạnh (Giới thiệu)**: bento 2 hàng so le — hàng trên lớn–nhỏ, hàng dưới nhỏ–lớn (3/5 – 2/5), ảnh làm nền thẻ, lớp phủ `ink` từ dưới lên, chữ `paper`. Rê vào thẻ nhỏ thì hai thẻ đổi bề rộng (CSS `.usp-row` trong `globals.css`). Mobile xếp 1 cột.
- **Hoạ tiết chìm**: logo "A" độ mờ 3–5% ở góc nền khối Giới thiệu.

## 6. Chuyển động

- Hero chạy bằng CSS (`hero-rise`, `hero-unveil`) — không phụ thuộc JS.
- Các section khác: gắn `data-reveal="up|left|right|blur"` (+ `--reveal-delay`) và `reveal-zoom` cho ảnh; `RevealOnScroll` kích hoạt khi cuộn tới.
- Mọi chuyển động phải tắt khi `prefers-reduced-motion`.

## 7. Ảnh

- Ảnh dùng trên web đặt ở `public/images/portfolio/`, tên `<dịch-vụ|concept>-<bộ>-NN.jpg` (vd. `concept-lotus-03.jpg`). Logo: `public/images/logo-mark-black.png`, `logo-mark-white.png` (nền trong suốt).
- Lookbook: 30 ảnh bốc ngẫu nhiên một lần (seed cố định) từ `library/`, chép sang `portfolio/lookbook/lookbook-NN-<bộ>.jpg`. Không random lúc render (vỡ prerender tĩnh của `cacheComponents`).
- `public/images/library/` là kho gốc khách gửi (tên file/thư mục chưa chuẩn) — chỉ để chọn ảnh, **không** tham chiếu trực tiếp trong code.
- Ảnh luôn qua `next/image`, `alt` tiếng Việt mô tả đúng nội dung; ảnh đầu màn hình dùng `preload` (Next 16 đã bỏ `priority`).
- Không dùng ảnh stock/ảnh AI làm ảnh "của studio". Chưa có ảnh thật → placeholder.
