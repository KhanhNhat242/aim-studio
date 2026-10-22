// Nguồn dữ liệu doanh nghiệp duy nhất — lấy nguyên văn từ docs/REQUIREMENTS.md.
// Mọi component phải import từ đây, không hardcode SĐT, địa chỉ, link, dịch vụ.

export interface Phone {
  display: string
  tel: string
}

export interface ServiceImage {
  src: string
  alt: string
}

export interface Service {
  slug: string
  name: string
  description: string
  // null = chưa có ảnh thật trong Drive tư liệu → hiển thị placeholder
  cover: ServiceImage | null
  hover?: ServiceImage
}

const address = '128 Nguyễn Sinh Cung, Huế'

export const site = {
  name: 'AIM Studio',
  slogan: 'Hãy để AIM lưu giữ thanh xuân của bạn',
  city: 'Huế',
  address,
  bookingPhones: [
    { display: '0784 857 777', tel: '0784857777' },
    { display: '0799 821 111', tel: '0799821111' },
  ] satisfies Phone[],
  zalo: {
    display: '0799 821 111',
    url: 'https://zalo.me/0799821111',
  },
  facebook: {
    display: 'AIMstudio86',
    url: 'https://www.facebook.com/AIMstudio86',
  },
  maps: {
    url: 'https://maps.app.goo.gl/juYykovSTWYPPygW7',
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
  },
  priceNote: 'Liên hệ để nhận báo giá',
} as const

export const navItems = [
  { label: 'Trang chủ', href: '/#trang-chu' },
  { label: 'Giới thiệu', href: '/#gioi-thieu' },
  { label: 'Dịch vụ', href: '/#dich-vu' },
  { label: 'Liên hệ', href: '/#lien-he' },
] as const

// Đúng 6 dịch vụ, đúng thứ tự trong phiếu
export const services: Service[] = [
  {
    slug: 'beauty',
    name: 'Beauty',
    description:
      'Vẻ đẹp dịu dàng, thanh tao trong tà lụa xanh, ô giấy và sen trắng — nét nữ tính đậm chất cổ điển.',
    cover: { src: '/images/portfolio/concept-lotus-01.jpg', alt: 'Cô gái áo lụa xanh cầm ô giấy trắng bên bình sen' },
    hover: { src: '/images/portfolio/concept-lotus-03.jpg', alt: 'Cô gái áo lụa xanh ngồi dưới ô giấy bên hoa sen trắng' },
  },
  {
    slug: 'concept',
    name: 'Concept',
    description:
      'Từ nàng thơ bên sen hồng, cánh bướm vàng đến khung cảnh lông vũ mơ màng — mỗi concept là một câu chuyện riêng.',
    cover: { src: '/images/portfolio/concept-lotus-02.jpg', alt: 'Ảnh concept nàng thơ bên hoa sen và cánh bướm' },
    hover: { src: '/images/portfolio/concept-feather-02.jpg', alt: 'Ảnh concept mơ màng giữa lông vũ tông vàng' },
  },
  {
    slug: 'profile',
    name: 'Profile',
    description:
      'Chân dung cận cảnh trên nền xám tối giản, ánh sáng mềm tôn làn da và thần thái tự nhiên của bạn.',
    cover: { src: '/images/portfolio/beauty-02.jpg', alt: 'Ảnh chân dung cô gái tóc xoăn chống cằm trên nền xám sáng' },
    hover: { src: '/images/portfolio/beauty-03.jpg', alt: 'Ảnh chân dung cô gái tóc xoăn nghiêng vai trên nền xám sáng' },
  },
  {
    slug: 'ngoai-canh',
    name: 'Ngoại cảnh',
    description:
      'Váy lụa bên sóng biển và bãi cát lúc chiều buông — những khung hình phóng khoáng, tràn đầy cảm xúc.',
    cover: { src: '/images/portfolio/outdoor-01.jpg', alt: 'Ảnh ngoại cảnh cô gái váy lụa bên bờ biển' },
    hover: { src: '/images/portfolio/outdoor-02.jpg', alt: 'Ảnh ngoại cảnh cô gái đứng trên bãi cát' },
  },
]
