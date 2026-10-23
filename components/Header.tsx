'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navItems, site } from '@/lib/site-config'
import { PhoneIcon } from '@/components/icons'

// id section ứng với từng mục menu, lấy từ href "/#..."
const sectionIds = navItems.map((item) => item.href.split('#')[1])

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeId, setActiveId] = useState<string>(sectionIds[0])
    const hotline = site.bookingPhones[0]

    useEffect(() => {
        let frame = 0
        const update = () => {
            frame = 0
            // Khi đã cuộn khỏi đầu trang thì hiện đường kẻ mảnh dưới header
            setIsScrolled(window.scrollY > 8)

            // Mục active = section cuối cùng có đỉnh đã vượt qua mốc ~40% màn hình.
            // Section không có trên menu (vd. Lookbook) giữ nguyên mục trước đó.
            const marker = window.innerHeight * 0.4
            let current = sectionIds[0]
            for (const id of sectionIds) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top <= marker) current = id
            }
            // Chạm đáy trang thì luôn active mục cuối (section cuối thường không cuộn tới mốc)
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
            setActiveId(atBottom ? sectionIds[sectionIds.length - 1] : current)
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    const closeMenu = () => setIsOpen(false)

    return (
        <header
            className={`header-drop sticky top-0 z-50 w-full bg-paper/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 border-b ${isScrolled || isOpen ? 'border-line' : 'border-transparent'}`}
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
                        {navItems.map((item, i) => {
                            const isActive = activeId === sectionIds[i]
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActive ? 'location' : undefined}
                                        className={`group relative py-1 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-mute'}`}
                                    >
                                        {item.label}
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`}
                                        />
                                    </Link>
                                </li>
                            )
                        })}
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
                        {navItems.map((item, i) => {
                            const isActive = activeId === sectionIds[i]
                            return (
                                <li key={item.href} className="border-b border-line last:border-0">
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        aria-current={isActive ? 'location' : undefined}
                                        className={`flex items-center justify-between py-4 font-display text-2xl transition-colors ${isActive ? 'text-ink' : 'text-silver'}`}
                                    >
                                        {item.label}
                                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
