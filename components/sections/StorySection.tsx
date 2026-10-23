import React from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import SideOrnaments from '@/components/SideOrnaments'
import { services } from '@/lib/site-config'

// "Beauty, Concept, …, Gia đình và Chụp bầu" — lấy từ danh sách dịch vụ, không hardcode
const serviceNames = services.map((s) => s.name)
const serviceList = `${serviceNames.slice(0, -1).join(', ')} và ${serviceNames.at(-1)}`

// Nội dung lấy từ mô tả khách cung cấp (xem docs/REQUIREMENTS.md, mục 6).
// image.position: điểm lấy nét khi ảnh dọc bị cắt thành thẻ ngang (mặc định 50% 30%).
const values: { title: string; text: string; image: { src: string; alt: string; position?: string } }[] = [
    {
        title: 'Đa dạng concept',
        text: 'Phù hợp nhiều phong cách — thỏa sức lựa chọn phong cách yêu thích.',
        image: { src: '/images/portfolio/concept-feather-01.jpg', alt: 'Ảnh concept mơ màng giữa lông vũ tông vàng' },
    },
    {
        title: 'Hỗ trợ tạo dáng tận tình',
        text: 'Luôn hướng dẫn tận tình, kể cả khi bạn chưa biết cách pose.',
        image: { src: '/images/portfolio/concept-little-star-01.jpg', alt: 'Cô gái váy trắng mỉm cười cầm bánh kem sinh nhật' },
    },
    {
        title: 'Chỉn chu từng khung hình',
        text: 'Chú trọng ánh sáng, góc chụp và màu ảnh trong từng bức ảnh.',
        image: { src: '/images/portfolio/concept-pink-birthday-01.jpg', alt: 'Ảnh cận mặt cô gái bên bó hoa hồng phấn' },
    },
    {
        title: 'Không gian được đầu tư',
        text: 'Không gian chụp ảnh được đầu tư để bạn tự tin tỏa sáng.',
        image: { src: '/images/portfolio/concept-party-01.jpg', alt: 'Bối cảnh dạ tiệc nến trắng tại AIM Studio', position: '50% 12%' },
    },
]

// Hàng trên: lớn – nhỏ, hàng dưới: nhỏ – lớn (so le)
const rows = [
    [
        { index: 0, size: 'large' },
        { index: 1, size: 'small' },
    ],
    [
        { index: 2, size: 'small' },
        { index: 3, size: 'large' },
    ],
] as const

const StorySection = () => {
    return (
        <section id="gioi-thieu" className="anchor-offset section-y relative overflow-hidden bg-smoke">
            <SideOrnaments variant="story" />
            {/* Logo chữ "A" làm hoạ tiết chìm ở góc nền */}
            <Image
                src="/images/logo-mark-black.png"
                alt=""
                width={512}
                height={512}
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-16 w-80 opacity-[0.04] select-none sm:w-112 lg:-right-20 lg:-top-24 lg:w-150"
            />

            <div className="shell relative">
                <SectionHeading
                    align="center"
                    eyebrow="Về AIM Studio"
                    title="Không chỉ là một buổi chụp ảnh"
                    description={`Đây là cách bạn lưu giữ phiên bản xinh đẹp nhất của chính mình. AIM Studio đồng hành cùng bạn qua ${services.length} dịch vụ chụp ảnh: ${serviceList}.`}
                    className="mb-12 lg:mb-16"
                />

                {/* 4 điểm mạnh dạng bento so le: hàng trên lớn – nhỏ, hàng dưới nhỏ – lớn.
                    Rê chuột vào thẻ nhỏ thì hai thẻ trong hàng đổi bề rộng (CSS .usp-row). */}
                <div className="flex flex-col gap-4 md:gap-5">
                    {rows.map((row, r) => (
                        <ul key={r} className="usp-row flex flex-col gap-4 md:flex-row md:gap-5">
                            {row.map(({ index, size }, c) => {
                                const value = values[index]
                                return (
                                    <li
                                        key={value.title}
                                        data-size={size}
                                        // Thẻ cột trái trượt vào từ trái, cột phải từ phải
                                        data-reveal={c === 0 ? 'left' : 'right'}
                                        style={{ '--reveal-delay': `${(r * 2 + c) * 120}ms` } as React.CSSProperties}
                                        className="usp-card group relative h-80 overflow-hidden bg-ink md:h-96"
                                    >
                                        {/* Lớp bọc riêng cho hiệu ứng hover để không đè transform của reveal-zoom */}
                                        <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                                            <Image
                                                src={value.image.src}
                                                alt={value.image.alt}
                                                fill
                                                // Thẻ nào cũng có lúc giãn tới 3/5 hàng khi hover
                                                sizes="(min-width: 768px) 60vw, 100vw"
                                                className="reveal-zoom object-cover"
                                                style={{ objectPosition: value.image.position ?? '50% 30%' }}
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 via-55% to-ink/5" />

                                        <div className="reveal-rise absolute inset-x-0 bottom-0 p-7 text-paper md:p-8">
                                            <h3 className="mt-3 font-display text-2xl whitespace-nowrap md:text-[1.7rem]">
                                                {value.title}
                                            </h3>
                                            <span className="mt-3 block h-px w-10 bg-paper/70 transition-all duration-500 group-hover:w-16 group-hover:bg-paper" />
                                            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-paper/85">{value.text}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StorySection
