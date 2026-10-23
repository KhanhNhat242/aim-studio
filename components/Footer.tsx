import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navItems, site } from '@/lib/site-config'

const Footer = () => {
    return (
        <footer className="bg-ink text-paper selection:bg-paper selection:text-ink">
            <div className="shell">
                <div className="flex flex-col gap-10 border-t border-paper/10 pt-12 lg:flex-row lg:items-center lg:justify-between lg:pt-14">
                    {/* Hàng địa chỉ dưới cùng không gắn data-reveal: sát đáy trang nên có thể không bao giờ chạm mốc kích hoạt */}
                    <div data-reveal="left" className="flex items-center gap-4">
                        <Image src="/images/logo-mark-white.png" alt="" width={40} height={40} className="h-10 w-10" />
                        <div>
                            <p className="text-sm font-semibold tracking-[0.42em]">AIM STUDIO</p>
                            <p className="mt-1.5 font-display text-sm italic text-silver">{site.slogan}</p>
                        </div>
                    </div>

                    <nav data-reveal="right" style={{ '--reveal-delay': '120ms' } as React.CSSProperties} aria-label="Liên kết cuối trang">
                        <ul className="flex flex-wrap gap-x-8 gap-y-3">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-[12px] uppercase tracking-[0.18em] text-silver transition-colors hover:text-paper"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 py-6 text-[13px] text-silver sm:flex-row sm:justify-between lg:pb-8">
                    <p>{site.address}</p>
                    <p>
                        Booking:{' '}
                        {site.bookingPhones.map((phone, i) => (
                            <React.Fragment key={phone.tel}>
                                {i > 0 && ' & '}
                                <a href={`tel:${phone.tel}`} className="transition-colors hover:text-paper">
                                    {phone.display}
                                </a>
                            </React.Fragment>
                        ))}
                    </p>
                    <p>© {site.name}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
