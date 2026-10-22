import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { services, site } from '@/lib/site-config'
import { ArrowIcon, ChatIcon, PhoneIcon } from '@/components/icons'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

// Huy hiệu tròn chữ chạy vòng, logo "A" ở giữa
// (id riêng vì huy hiệu render 2 lần: bản mobile và bản desktop)
const RotatingBadge = ({ id, className = '' }: { id: string; className?: string }) => (
    <div className={`h-24 w-24 xl:h-28 xl:w-28 ${className}`} aria-hidden>
        <div className="relative h-full w-full">
            <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none">
                <defs>
                    <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-ink text-[9px] font-medium uppercase tracking-[0.2em]">
                    <textPath href={`#${id}`} textLength="236" lengthAdjust="spacing">
                        · Hãy để AIM lưu giữ thanh xuân của bạn
                    </textPath>
                </text>
            </svg>
            <Image
                src="/images/logo-mark-black.png"
                alt=""
                width={40}
                height={40}
                className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 xl:h-8 xl:w-8"
            />
        </div>
    </div>
)

// Số liệu thật lấy từ REQUIREMENTS — không dùng số "đẹp" tự bịa
const facts = [
    { value: String(services.length).padStart(2, '0'), label: 'Dịch vụ chụp ảnh' },
    { value: String(site.bookingPhones.length).padStart(2, '0'), label: 'Hotline booking' },
    { value: site.address.split(' ')[0], label: site.address.split(' ').slice(1).join(' ') },
]

const HeroSection = () => {
    const hotline = site.bookingPhones[0]

    return (
        <section id="trang-chu" className="anchor-offset relative overflow-hidden bg-paper">
            {/*
              Mobile/tablet: các cột dùng `contents` để xếp lại theo order (chữ → ảnh → CTA).
              Desktop: lưới 3 cột [chữ trái | người mẫu | chữ phải], cao đúng 1 màn hình.
            */}
            <div className="shell flex flex-col pt-8 lg:grid lg:h-(--hero-h) lg:grid-cols-[minmax(0,1fr)_var(--model-w)_minmax(0,1fr)] lg:pt-0 [--hero-h:clamp(40rem,calc(100svh-var(--header-h)),55rem)] [--model-w:calc(var(--hero-h)*0.88*2/3)]">
                {/* ===== Cột trái ===== */}
                <div className="contents lg:relative lg:z-0 lg:flex lg:flex-col lg:py-10 xl:py-12">

                    <h1 className="order-2 lg:order-none mt-5 font-display leading-[0.98] text-[clamp(2.75rem,5.4vw,5rem)] lg:mt-6 lg:whitespace-nowrap">
                        <span className="hero-rise block text-ink" style={delay(200)}>Hãy để AIM</span>
                        <span className="hero-rise block text-mute" style={delay(300)}>lưu giữ</span>
                        {/* Nửa sau slogan hiển thị ở cột phải (aria-hidden) — giữ ở đây để trình đọc màn hình đọc liền mạch */}
                        <span className="sr-only"> thanh xuân của bạn</span>
                    </h1>

                    <div className="order-5 mt-8 lg:order-none lg:mt-auto">
                        <p
                            className="hero-rise max-w-sm text-[15px] leading-relaxed text-graphite xl:text-base"
                            style={delay(450)}
                        >
                            Nơi ghi dấu những khoảnh khắc tự nhiên, trong trẻo và giàu cảm xúc nhất trong từng cột mốc đáng nhớ của bạn.
                        </p>
                    </div>
                </div>

                {/* ===== Giữa: người mẫu + logo "A" chìm phía sau ===== */}
                <div className="relative order-4 mx-auto mt-8 h-[62svh] max-h-[34rem] min-h-88 aspect-2/3 lg:z-10 lg:order-none lg:mx-0 lg:mt-0 lg:h-[88%] lg:max-h-none lg:min-h-0 lg:w-full lg:self-end">
                    {/* hero-rise kết thúc ở opacity 1 nên độ mờ phải đặt ở lớp trong */}
                    <div className="hero-rise absolute inset-0" style={delay(150)} aria-hidden>
                        <Image
                            src="/images/logo-mark-black.png"
                            alt=""
                            width={512}
                            height={512}
                            className="absolute bottom-[4%] left-1/2 w-[135%] max-w-none -translate-x-1/2 opacity-[0.06]"
                        />
                    </div>
                    <Image
                        src="/images/hero-img.png"
                        alt="Người mẫu váy đen dạ tiệc trong bộ ảnh Party at AIM Studio"
                        fill
                        preload
                        sizes="(min-width: 1024px) 34vw, 62vw"
                        className="hero-rise object-contain object-bottom [mask-image:linear-gradient(to_left,transparent,black_9%)]"
                        style={delay(250)}
                    />
                    <RotatingBadge id="hero-badge-mobile" className="absolute -right-2 top-[4%] lg:hidden" />
                </div>

                {/* ===== Cột phải ===== */}
                <div className="contents lg:relative lg:z-0 lg:flex lg:flex-col lg:items-end lg:py-10 lg:text-right xl:py-12">
                    <div className="hero-rise hidden lg:block" style={delay(700)}>
                        <RotatingBadge id="hero-badge-desktop" />
                    </div>

                    <p
                        aria-hidden
                        className="order-3 font-display leading-[0.98] text-[clamp(2.75rem,5.4vw,5rem)] text-right lg:order-none lg:mt-4 lg:whitespace-nowrap"
                    >
                        <em className="hero-rise block font-normal italic text-mute" style={delay(350)}>thanh xuân</em>
                        <span className="hero-rise block text-ink" style={delay(450)}>của bạn</span>
                    </p>

                    <p
                        className="hero-rise mt-6 hidden max-w-60 font-display text-[15px] italic leading-relaxed text-mute lg:block"
                        style={delay(600)}
                    >
                    </p>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
