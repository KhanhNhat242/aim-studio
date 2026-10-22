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
      'Tôn vinh đường nét gương mặt thanh tú và thần thái rạng rỡ của riêng bạn trong từng khung hình cận cảnh.',
    cover: { src: '/images/portfolio/beauty-02.jpg', alt: 'Ảnh Beauty cận mặt, cô gái chống cằm trên nền xám sáng' },
    hover: { src: '/images/portfolio/beauty-03.jpg', alt: 'Ảnh Beauty cô gái nghiêng vai trên nền xám sáng' },
  },
  {
    slug: 'concept',
    name: 'Concept',
    description:
      'Thỏa sức hóa thân vào những bối cảnh nghệ thuật độc đáo, mang đậm dấu ấn và cá tính tuổi trẻ.',
    cover: { src: '/images/portfolio/concept-lotus-02.jpg', alt: 'Ảnh concept nàng thơ bên hoa sen và cánh bướm' },
    hover: { src: '/images/portfolio/concept-feather-02.jpg', alt: 'Ảnh concept mơ màng giữa lông vũ tông vàng' },
  },
  {
    slug: 'profile',
    name: 'Profile',
    description:
      'Xây dựng hình ảnh cá nhân chỉn chu, tự tin và chuyên nghiệp cho công việc cũng như sự nghiệp.',
    // TODO: lấy ảnh Profile thật từ thư mục Drive tư liệu
    cover: null,
  },
  {
    slug: 'ngoai-canh',
    name: 'Ngoại cảnh',
    description:
      'Bắt trọn những khoảnh khắc tự do, phóng khoáng và tràn đầy sức sống giữa không gian thiên nhiên tươi đẹp.',
    cover: { src: '/images/portfolio/outdoor-01.jpg', alt: 'Ảnh ngoại cảnh cô gái váy lụa bên bờ biển' },
    hover: { src: '/images/portfolio/outdoor-02.jpg', alt: 'Ảnh ngoại cảnh cô gái đứng trên bãi cát' },
  },
  {
    slug: 'gia-dinh',
    name: 'Gia đình',
    description:
      'Gói trọn những giây phút sum vầy ấm áp và tình cảm gắn kết yêu thương giữa các thành viên.',
    // TODO: lấy ảnh Gia đình thật từ thư mục Drive tư liệu
    cover: null,
  },
  {
    slug: 'chup-bau',
    name: 'Chụp bầu',
    description:
      'Lưu giữ hành trình làm mẹ thiêng liêng với những đường nét dịu dàng, đằm thắm và ngập tràn hạnh phúc.',
    // TODO: lấy ảnh Chụp bầu thật từ thư mục Drive tư liệu
    cover: null,
  },
]
