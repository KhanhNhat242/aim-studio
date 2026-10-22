import React from 'react'
import SectionHeading from '@/components/SectionHeading'
import LookbookGallery from '@/components/sections/LookbookGallery'
import { lookbookPhotos } from '@/lib/lookbook-photos'

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

                {/* Album cột so le: desktop 9 ảnh, mobile 7 ảnh + ô "Xem thêm" ở cuối; popup xem đủ 30 ảnh */}
                <LookbookGallery photos={lookbookPhotos} />
            </div>
        </section>
    )
}

export default LookbookSection
