'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navItems, site } from '@/lib/site-config'
import { PhoneIcon } from '@/components/icons'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const hotline = site.bookingPhones[0]

    // Khi đã cuộn khỏi đầu trang thì hiện đường kẻ mảnh dưới header
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const closeMenu = () => setIsOpen(false)

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-paper/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 border-b ${isScrolled || isOpen ? 'border-line' : 'border-transparent'}`}
        >
            <div className="shell flex h-(--header-h) items-center justify-between gap-6">
                {/* Logo chữ "A" + wordmark */}
                <Link href="/#trang-chu" onClick={closeMenu} className="flex items-center gap-3" aria-label={`${site.name} — Trang chủ`}>
                    <Image src="/images/logo-mark-black.png" alt="" width={36} height={36} className="h-8 w-8 lg:h-9 lg:w-9" />
                    <span className="flex flex-col leading-none">
                        <span className="text-[15px] font-semibold tracking-[0.42em] text-ink">AIM</span>
                        <span className="mt-1 text-[9px] font-medium tracking-[0.62em] text-mute">STUDIO</span>
                    </span>
                </Link>

                {/* Menu desktop */}
                <nav aria-label="Điều hướng chính" className="hidden lg:block">
                    <ul className="flex items-center gap-10">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="group relative py-1 text-[13px] font-medium uppercase tracking-[0.18em] text-graphite transition-colors hover:text-ink"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href={`tel:${hotline.tel}`}
                        className="hidden items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink sm:inline-flex"
                    >
                        <PhoneIcon width={14} height={14} />
                        Đặt lịch ngay
                    </a>
                    <a
                        href={`tel:${hotline.tel}`}
                        aria-label={`Gọi đặt lịch ${hotline.display}`}
                        className="inline-flex h-10 w-10 items-center justify-center border border-ink bg-ink text-paper sm:hidden"
                    >
                        <PhoneIcon width={16} height={16} />
                    </a>

                    {/* Nút mở menu trên mobile/tablet */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={isOpen}
                        className="relative inline-flex h-10 w-10 items-center justify-center text-ink lg:hidden"
                    >
                        <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                        <span className={`absolute h-px w-5 bg-current transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
                    </button>
                </div>
            </div>

            {/* Menu xổ xuống trên mobile/tablet */}
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <nav aria-label="Điều hướng di động" className="overflow-hidden">
                    <ul className="shell flex flex-col py-4">
                        {navItems.map((item) => (
                            <li key={item.href} className="border-b border-line last:border-0">
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="block py-4 font-display text-2xl text-ink"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
