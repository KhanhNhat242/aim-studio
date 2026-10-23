import React from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { services, type Service } from '@/lib/site-config'

// Khung xám trung tính khi chưa có ảnh thật cho dịch vụ
const ImagePlaceholder = ({ name }: { name: string }) => (
    <div className="absolute inset-0 bg-smoke">
        <div className="absolute inset-3 flex flex-col items-center justify-center gap-4 border border-line">
            <Image src="/images/logo-mark-black.png" alt="" width={56} height={56} aria-hidden className="opacity-[0.08]" />
            <span className="font-display text-2xl italic text-silver">{name}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-silver">Ảnh đang cập nhật</span>
        </div>
    </div>
)

// Ghim tròn trên đầu thẻ (bóng đổ + chấm sáng cho cảm giác nổi khối)
const Pin = () => (
    // reveal-pin: ghim thả xuống sau khi thẻ đã trượt vào
    <span aria-hidden className="reveal-pin absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <span className="block h-6 w-6 rounded-full bg-ink shadow-[0_6px_10px_-2px_rgb(9_9_11/0.45),inset_-3px_-3px_6px_rgb(255_255_255/0.12)]">
            <span className="absolute left-1.5 top-1 h-2 w-2 rounded-full bg-paper/40" />
        </span>
    </span>
)

// Thẻ ghim: trái/phải xen kẽ, hơi nghiêng, rê chuột thì thẳng lại và nhấc lên
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const isLeft = index % 2 === 0

    return (
        <article
            // Thẻ trượt vào từ phía nó đứng
            data-reveal={isLeft ? 'left' : 'right'}
            // < 768px: thẻ rộng (>50%) nên xếp so le nối tiếp, không chồng dọc.
            // ≥ 768px: thẻ < 50% không chồng ngang → mới được đẩy lên chồng dọc (md theo % bề rộng khung).
            className={`relative z-10 w-[88%] sm:w-[60%] md:w-[46%] lg:w-[44%] ${isLeft ? 'self-start' : 'self-end'} ${index > 0 ? 'mt-8 md:-mt-[30%] lg:-mt-72' : ''}`}
        >
            <div
                className={`group relative bg-paper p-3 shadow-[0_24px_48px_-24px_rgb(9_9_11/0.3)] ring-1 ring-line transition-[rotate,translate,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_32px_56px_-24px_rgb(9_9_11/0.4)] sm:p-4 ${isLeft ? '-rotate-2' : 'rotate-2'}`}
            >
                <Pin />

                {/* Ảnh làm nền cả thẻ, chữ đè ở đáy trên lớp phủ ink */}
                <div className="relative aspect-2/3 overflow-hidden bg-smoke selection:bg-paper selection:text-ink">
                    {service.cover ? (
                        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-104">
                            <Image
                                src={service.cover.src}
                                alt={service.cover.alt}
                                fill
                                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 88vw"
                                className="reveal-zoom object-cover object-[50%_20%]"
                            />
                            {service.hover && (
                                <Image
                                    src={service.hover.src}
                                    alt={service.hover.alt}
                                    fill
                                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 88vw"
                                    className="object-cover object-[50%_20%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                            )}
                        </div>
                    ) : (
                        <ImagePlaceholder name={service.name} />
                    )}

                    {/* Lớp phủ đậm dần xuống đáy để chữ trắng luôn đọc được trên mọi ảnh */}
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/90 via-ink/50 to-transparent" />

                    <div className="reveal-rise absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-6 sm:pb-6">
                        <h3 className="font-display text-2xl text-paper lg:text-[1.75rem]">{service.name}</h3>
                        {/* text-pretty: không để một chữ rớt lẻ xuống dòng cuối */}
                        <p className="mt-2 text-[15px] leading-relaxed text-paper/80 text-pretty">{service.description}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

// Đường đứt nét cong nối các thẻ theo hình zigzag (toạ độ % theo khung, nằm dưới thẻ)
const Connector = ({ count }: { count: number }) => {
    const x = (i: number) => (i % 2 === 0 ? 28 : 72)
    const y = (i: number) => ((i + 0.5) / count) * 100
    let d = `M ${x(0)} ${y(0)}`
    for (let i = 1; i < count; i++) {
        const mid = (y(i - 1) + y(i)) / 2
        d += ` C ${x(i - 1)} ${mid}, ${x(i)} ${mid}, ${x(i)} ${y(i)}`
    }

    return (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={d} fill="none" className="stroke-silver" strokeWidth="1.5" strokeDasharray="6 7" vectorEffect="non-scaling-stroke" />
        </svg>
    )
}

const ServicesSection = () => {
    return (
        <section id="dich-vu" className="anchor-offset section-y relative overflow-hidden bg-paper">
            {/* Nền giấy kẻ dòng mờ như bảng ghim */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_39px,var(--color-line)_39px,var(--color-line)_40px)]"
            />

            <div className="shell relative">
                <SectionHeading align="center" eyebrow="" title="Dịch vụ chụp ảnh tại AIM" className="mb-12 lg:mb-16" />

                {/* Thẻ ghim xếp zigzag trái – phải, chồng nhẹ lên nhau, nối bằng đường đứt nét */}
                <div className="relative mx-auto flex max-w-5xl flex-col pt-3">
                    <Connector count={services.length} />
                    {services.map((service, index) => (
                        <ServiceCard key={service.slug} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection
