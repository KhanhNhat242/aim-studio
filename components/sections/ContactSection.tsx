import React from 'react'
import { site } from '@/lib/site-config'
import SectionHeading from '@/components/SectionHeading'
import { ChatIcon, FacebookIcon, PhoneIcon, PinIcon } from '@/components/icons'

const outlineButton =
    'inline-flex items-center gap-2.5 border border-paper/30 px-5 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink'

const textLink =
    'group inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-silver transition-colors hover:text-paper'

const ContactSection = () => {
    return (
        <section id="lien-he" className="anchor-offset section-y bg-ink text-paper selection:bg-paper selection:text-ink">
            <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Cột trái: thông tin liên hệ */}
                <div className="lg:col-span-5">
                    <SectionHeading
                        tone="dark"
                        eyebrow="Liên hệ & đặt lịch"
                        title="Cùng AIM viết tiếp câu chuyện thanh xuân của bạn."
                    />

                    <dl data-reveal="up" className="mt-10 divide-y divide-paper/10 border-y border-paper/10 lg:mt-12">
                        <div className="flex gap-4 py-5">
                            <dt className="pt-0.5 text-silver">
                                <PinIcon />
                                <span className="sr-only">Địa chỉ</span>
                            </dt>
                            <dd className="text-[15px]">{site.address}</dd>
                        </div>
                        <div className="flex gap-4 py-5">
                            <dt className="pt-0.5 text-silver">
                                <PhoneIcon />
                                <span className="sr-only">Booking</span>
                            </dt>
                            <dd className="text-[15px]">
                                Booking:{' '}
                                {site.bookingPhones.map((phone, i) => (
                                    <React.Fragment key={phone.tel}>
                                        {i > 0 && ' & '}
                                        <a href={`tel:${phone.tel}`} className="underline-offset-4 hover:underline">
                                            {phone.display}
                                        </a>
                                    </React.Fragment>
                                ))}
                            </dd>
                        </div>
                    </dl>

                    {/* Hàng 1: gọi trực tiếp 2 số booking */}
                    <div data-reveal="up" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12">
                        {site.bookingPhones.map((phone, i) => (
                            <a
                                key={phone.tel}
                                href={`tel:${phone.tel}`}
                                className={
                                    i === 0
                                        ? 'inline-flex items-center justify-center gap-2.5 border border-paper bg-paper px-5 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-paper'
                                        : `${outlineButton} justify-center`
                                }
                            >
                                <PhoneIcon width={15} height={15} />
                                Gọi {phone.display}
                            </a>
                        ))}
                    </div>

                    {/* Hàng 2: kênh liên hệ khác */}
                    <ul data-reveal="up" className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                        {[
                            { href: site.zalo.url, label: `Zalo ${site.zalo.display}`, Icon: ChatIcon },
                            { href: site.facebook.url, label: 'Facebook', Icon: FacebookIcon },
                            { href: site.maps.url, label: 'Google Maps', Icon: PinIcon },
                        ].map(({ href, label, Icon }) => (
                            <li key={label}>
                                <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
                                    <Icon width={15} height={15} />
                                    <span className="border-b border-paper/30 pb-0.5 transition-colors group-hover:border-paper">{label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cột phải: bản đồ, lọc xám để hợp bộ màu */}
                <div data-reveal="up" className="lg:col-span-7">
                    <div className="relative aspect-4/3 h-full min-h-80 w-full overflow-hidden border border-paper/10 bg-graphite lg:aspect-auto">
                        <iframe
                            src={site.maps.embedUrl}
                            title={`Bản đồ ${site.name} — ${site.address}`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
