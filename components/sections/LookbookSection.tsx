import React from 'react'
import SectionHeading from '@/components/SectionHeading'
import LookbookGallery, { type LookbookPhoto } from '@/components/sections/LookbookGallery'
import { site } from '@/lib/site-config'
import { FacebookIcon } from '@/components/icons'

const portrait = { width: 1365, height: 2048 }

const photos: LookbookPhoto[] = [
    { src: '/images/portfolio/concept-lotus-03.jpg', alt: 'Concept nàng thơ cầm ô giấy trắng bên hoa sen', ...portrait },
    { src: '/images/portfolio/outdoor-03.jpg', alt: 'Ngoại cảnh cô gái váy lụa giữa sóng biển', ...portrait },
    { src: '/images/portfolio/concept-party-02.jpg', alt: 'Concept dạ tiệc váy đen nâng ly', ...portrait },
    { src: '/images/portfolio/concept-pink-birthday-02.jpg', alt: 'Concept sinh nhật hồng cận mặt bên hoa', ...portrait },
    { src: '/images/portfolio/concept-feather-wide.jpg', alt: 'Concept mơ màng giữa lông vũ tông vàng', width: 2048, height: 1365 },
    { src: '/images/portfolio/beauty-04.jpg', alt: 'Ảnh Beauty cô gái nháy mắt rạng rỡ', width: 1638, height: 2048 },
    { src: '/images/portfolio/concept-denim-01.jpg', alt: 'Concept thời trang denim tóc dài bay', ...portrait },
    { src: '/images/portfolio/concept-lotus-04.jpg', alt: 'Concept nàng thơ áo trắng cầm quạt và cánh bướm', ...portrait },
    { src: '/images/portfolio/outdoor-04.jpg', alt: 'Ngoại cảnh cô gái váy lụa tựa vách đá', ...portrait },
    { src: '/images/portfolio/concept-little-star-02.jpg', alt: 'Concept Little Star cô gái váy trắng cầm bánh kem', ...portrait },
    { src: '/images/portfolio/concept-party-03.jpg', alt: 'Concept dạ tiệc váy đen hở lưng', ...portrait },
    { src: '/images/portfolio/concept-pink-girl-01.jpg', alt: 'Concept Pink Girl bên bóng bay trái tim hồng', ...portrait },
    { src: '/images/portfolio/concept-lotus-05.jpg', alt: 'Concept nàng thơ áo lụa xanh bên bình sen trắng', ...portrait },
]

const LookbookSection = () => {
    return (
        <section id="lookbook" className="anchor-offset section-y bg-smoke">
            <div className="shell">
                <SectionHeading
                    align="center"
                    eyebrow="Lookbook"
                    title="Khoảnh khắc tại AIM Studio."
                    description="Những khung hình thanh xuân được lưu giữ bằng cả sự trân trọng."
                    className="mb-12 lg:mb-16"
                />

                <LookbookGallery photos={photos} />

                <div data-reveal="up" className="mt-12 flex justify-center lg:mt-16">
                    <a
                        href={site.facebook.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 border border-ink px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                    >
                        <FacebookIcon width={15} height={15} />
                        Xem thêm trên Facebook
                    </a>
                </div>
            </div>
        </section>
    )
}

export default LookbookSection
