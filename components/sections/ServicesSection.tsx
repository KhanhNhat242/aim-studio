import React from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { services, site, type Service } from '@/lib/site-config'
import { ArrowIcon } from '@/components/icons'

// Khung xám trung tính khi chưa có ảnh thật cho dịch vụ
const ImagePlaceholder = ({ name }: { name: string }) => (
    <div className="absolute inset-0 bg-smoke">
        <div className="absolute inset-4 flex flex-col items-center justify-center gap-5 border border-line lg:inset-5">
            <Image src="/images/logo-mark-black.png" alt="" width={64} height={64} aria-hidden className="opacity-[0.08]" />
            <span className="font-display text-3xl italic text-silver lg:text-4xl">{name}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-silver">Ảnh đang cập nhật</span>
        </div>
    </div>
)

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const hotline = site.bookingPhones[0]

    return (
        <article
            data-reveal="up"
            style={{ '--reveal-delay': `${(index % 3) * 120}ms` } as React.CSSProperties}
            className="group flex flex-col"
        >
            <div className="relative aspect-3/4 overflow-hidden bg-smoke">
                {service.cover ? (
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-104">
                        <Image
                            src={service.cover.src}
                            alt={service.cover.alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="reveal-zoom object-cover object-[50%_15%]"
                        />
                        {service.hover && (
                            <Image
                                src={service.hover.src}
                                alt={service.hover.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover object-[50%_15%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            />
                        )}
                    </div>
                ) : (
                    <ImagePlaceholder name={service.name} />
                )}
            </div>

            <div className="flex flex-1 flex-col pt-6">
                <h3 className="font-display text-2xl text-ink lg:text-[1.75rem]">{service.name}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-mute">{service.description}</p>
            </div>
        </article>
    )
}

const ServicesSection = () => {
    return (
        <section id="dich-vu" className="anchor-offset section-y bg-paper">
            <div className="shell">
                <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading eyebrow="" title="Dịch vụ chụp ảnh tại AIM" />
                </div>

                {/* Lưới 3 × 2, cột giữa thấp hơn tạo nhịp lệch tầng */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
                    {services.map((service, index) => (
                        <div key={service.slug} className={index % 3 === 1 ? 'lg:mt-12' : ''}>
                            <ServiceCard service={service} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection
