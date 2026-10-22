import React from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'

const values = [
    {
        title: 'Đa dạng phong cách',
        text: 'Đáp ứng trọn vẹn từ ảnh cá nhân, nghệ thuật đến kỷ niệm gia đình.',
        image: { src: '/images/portfolio/concept-feather-01.jpg', alt: 'Ảnh concept mơ màng giữa lông vũ tông vàng' },
    },
    {
        title: 'Cảm xúc chân thật',
        text: 'Tôn vinh vẻ đẹp tự nhiên và câu chuyện riêng của mỗi khách hàng.',
        image: { src: '/images/portfolio/concept-little-star-01.jpg', alt: 'Cô gái váy trắng mỉm cười cầm bánh kem sinh nhật' },
    },
    {
        title: 'Chỉn chu từng khung hình',
        text: 'Đầu tư kỹ lưỡng về ánh sáng, bối cảnh và thần thái nhân vật.',
        image: { src: '/images/portfolio/concept-pink-birthday-01.jpg', alt: 'Ảnh cận mặt cô gái bên bó hoa hồng phấn' },
    },
]

const StorySection = () => {
    return (
        <section id="gioi-thieu" className="anchor-offset section-y relative overflow-hidden bg-smoke">
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
                    title="Lưu giữ trọn vẹn nét đẹp thanh xuân."
                    className="mb-12 lg:mb-16"
                />

                <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
                    {values.map((value, index) => (
                        <article
                            key={value.title}
                            data-reveal="up"
                            style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
                            className={index === 1 ? 'sm:mt-12' : ''}
                        >
                            <div className="relative aspect-3/4 overflow-hidden bg-line">
                                <Image
                                    src={value.image.src}
                                    alt={value.image.alt}
                                    fill
                                    sizes="(min-width: 640px) 33vw, 100vw"
                                    className="reveal-zoom object-cover"
                                />
                            </div>
                            <div className="mt-6 flex gap-5">
                                <span className="font-display text-sm italic text-silver">0{index + 1}</span>
                                <div>
                                    <h3 className="font-display text-xl text-ink lg:text-2xl">{value.title}</h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-mute">{value.text}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StorySection
