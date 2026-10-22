import React from 'react'
import Image from 'next/image'
import { site } from '@/lib/site-config'
import { ChatIcon, PhoneIcon } from '@/components/icons'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

const HeroSection = () => {
    const hotline = site.bookingPhones[0]

    return (
        <section
            id="trang-chu"
            className="anchor-offset relative bg-paper"
        >
            <div className="shell relative flex min-h-[calc(100svh-var(--header-h))] flex-col gap-8 pt-8 pb-6 lg:grid lg:h-[calc(100svh-var(--header-h))] lg:min-h-160 lg:max-h-240 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-10">
                {/* Cột trái (5/12): thông điệp */}
                <div className="relative z-10 lg:col-span-5">
                    <p
                        className="hero-rise flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-mute"
                        style={delay(100)}
                    >
                        <span className="h-px w-8 bg-mute" />
                        {site.name} · {site.city}
                    </p>

                    <h1
                        className="hero-rise mt-6 font-display text-[2.3rem] leading-[1.1] text-ink sm:text-6xl lg:text-[3.75rem] lg:leading-[1.04] xl:text-[4.5rem]"
                        style={delay(200)}
                    >
                        {/* Mobile/tablet: 2 dòng cân; desktop: bậc thang 4 dòng kiểu tạp chí */}
                        <span className="lg:block">Hãy để AIM</span>{' '}
                        <span className="lg:block">lưu giữ</span>
                        <br className="lg:hidden" />
                        <em className="font-normal italic text-graphite lg:block lg:pl-[1.2em]">thanh xuân</em>{' '}
                        <span className="lg:block">của bạn</span>
                    </h1>

                    <p
                        className="hero-rise mt-6 max-w-md text-[15px] leading-relaxed text-mute sm:text-base lg:mt-8"
                        style={delay(350)}
                    >
                        Nơi ghi dấu những khoảnh khắc tự nhiên, trong trẻo và giàu cảm xúc nhất trong từng cột mốc đáng nhớ của bạn.
                    </p>

                    <div className="hero-rise mt-8 flex gap-3 lg:mt-10" style={delay(500)}>
                        <a
                            href={`tel:${hotline.tel}`}
                            className="inline-flex flex-1 items-center justify-center gap-2.5 border border-ink bg-ink px-4 py-3.5 sm:flex-none sm:px-6 text-[12px] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
                        >
                            <PhoneIcon width={15} height={15} />
                            Gọi đặt lịch
                        </a>
                        <a
                            href={site.zalo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2.5 border border-ink bg-paper px-4 py-3.5 sm:flex-none sm:px-6 text-[12px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                        >
                            <ChatIcon width={15} height={15} />
                            Chat Zalo
                        </a>
                    </div>
                </div>

                {/* Cột phải (7/12): bộ 3 ảnh lệch tầng */}
                <div className="relative min-h-80 flex-1 lg:col-span-7 lg:h-full lg:min-h-0">
                    {/* Khung viền mảnh lệch sau ảnh chính — chất tạp chí */}
                    <div
                        className="hero-rise absolute left-[24%] top-[9%] h-[84%] w-[50%] border border-ink/15"
                        style={delay(900)}
                        aria-hidden
                    />

                    {/* Ảnh chính: Beauty cận mặt */}
                    <figure
                        className="hero-unveil absolute left-[20%] top-[4%] h-[84%] w-[50%] overflow-hidden bg-smoke"
                        style={delay(250)}
                    >
                        <Image
                            src="/images/portfolio/beauty-01.jpg"
                            alt="Ảnh Beauty cận mặt tại AIM Studio, cô gái tóc xoăn đặt tay bên má"
                            fill
                            preload
                            sizes="(min-width: 1024px) 30vw, 50vw"
                            className="object-cover object-[50%_20%]"
                        />
                    </figure>

                    {/* Ảnh phụ trái, thấp hơn: concept hoa sen cầm ô */}
                    <figure
                        className="hero-unveil absolute bottom-0 left-0 z-10 h-[50%] w-[32%] overflow-hidden bg-smoke ring-6 ring-paper lg:ring-8"
                        style={delay(550)}
                    >
                        <Image
                            src="/images/portfolio/concept-lotus-01.jpg"
                            alt="Ảnh concept nàng thơ cầm ô giấy bên hoa sen"
                            fill
                            sizes="(min-width: 1024px) 20vw, 32vw"
                            className="object-cover object-[50%_25%]"
                        />
                    </figure>

                    {/* Ảnh phụ phải, cao hơn: concept váy đen dạ tiệc */}
                    <figure
                        className="hero-unveil absolute right-0 top-0 z-10 h-[48%] w-[30%] overflow-hidden bg-smoke ring-6 ring-paper lg:ring-8"
                        style={delay(700)}
                    >
                        <Image
                            src="/images/portfolio/concept-party-01.jpg"
                            alt="Ảnh concept dạ tiệc váy đen sang trọng"
                            fill
                            sizes="(min-width: 1024px) 20vw, 30vw"
                            className="object-cover object-[50%_20%]"
                        />
                    </figure>

                </div>

                {/* Gợi ý cuộn xuống, nằm dưới cột chữ để không đè ảnh */}
                <a
                    href="#gioi-thieu"
                    aria-label="Cuộn xuống phần giới thiệu"
                    className="absolute bottom-8 left-8 hidden h-14 w-px overflow-hidden bg-line lg:block"
                >
                    <span className="scroll-cue block h-full w-full bg-ink" />
                </a>
            </div>
        </section>
    )
}

export default HeroSection
