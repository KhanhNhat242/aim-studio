'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowIcon, ChevronIcon, CloseIcon } from '@/components/icons'

export interface LookbookPhoto {
    src: string
    alt: string
    width: number
    height: number
}

// Bố cục cột so le kiểu album: mỗi cột bắt đầu ở độ cao khác nhau, chân cột lệch nhau.
// Số ô mỗi cột (gồm cả ô "Xem thêm" ở cuối cột phải) + khoảng đẩy xuống đầu cột.
const DESKTOP_COLUMNS = [
    { size: 2, offset: 'pt-28' },
    { size: 3, offset: 'pt-12' },
    { size: 3, offset: 'pt-0' },
    { size: 2, offset: 'pt-20' },
]
const MOBILE_COLUMNS = [
    { size: 4, offset: 'pt-0' },
    { size: 4, offset: 'pt-12' },
]
const DESKTOP_QUERY = '(min-width: 1024px)'

type Slot = { kind: 'photo'; index: number } | { kind: 'more' }

// Chia các ảnh hiển thị + ô "Xem thêm" vào từng cột theo thứ tự
const buildColumns = (photoCount: number, columns: typeof DESKTOP_COLUMNS, withMore: boolean) => {
    const slots: Slot[] = Array.from({ length: photoCount }, (_, index) => ({ kind: 'photo', index }))
    if (withMore) slots.push({ kind: 'more' })
    let cursor = 0
    return columns.map((col) => {
        const items = slots.slice(cursor, cursor + col.size)
        cursor += col.size
        return { ...col, items }
    })
}

const ZoomIcon = () => (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" strokeWidth="1.6" />
        <path strokeLinecap="round" strokeWidth="1.6" d="M16 16l4 4M11 8.5v5M8.5 11h5" />
    </svg>
)

// Album ảnh cột so le + popup xem ảnh lớn (Esc để đóng, ← → để chuyển ảnh).
// Desktop hiện 9 ảnh, mobile 7 ảnh; ô cuối là nút "Xem thêm" mở popup tại ảnh đầu tiên chưa hiện.
const LookbookGallery = ({ photos }: { photos: LookbookPhoto[] }) => {
    const [active, setActive] = useState<number | null>(null)

    const desktopTotal = DESKTOP_COLUMNS.reduce((sum, c) => sum + c.size, 0)
    const mobileTotal = MOBILE_COLUMNS.reduce((sum, c) => sum + c.size, 0)
    // Đủ ảnh thì chừa 1 ô cuối cho "Xem thêm"
    const desktopCount = photos.length > desktopTotal ? desktopTotal - 1 : photos.length
    const mobileCount = photos.length > mobileTotal ? mobileTotal - 1 : photos.length
    const desktopColumns = buildColumns(desktopCount, DESKTOP_COLUMNS, desktopCount < photos.length)
    const mobileColumns = buildColumns(mobileCount, MOBILE_COLUMNS, mobileCount < photos.length)

    // Ảnh đầu tiên chưa hiện phụ thuộc bố cục đang dùng
    const openMore = () => setActive(window.matchMedia(DESKTOP_QUERY).matches ? desktopCount : mobileCount)

    const close = useCallback(() => setActive(null), [])
    const step = useCallback(
        (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
        [photos.length]
    )

    useEffect(() => {
        if (active === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowRight') step(1)
            if (e.key === 'ArrowLeft') step(-1)
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [active, close, step])

    const renderSlot = (slot: Slot, position: number, remaining: number) => {
        // Nhịp tỉ lệ khung xen kẽ để album không đều tăm tắp
        const aspect = position % 2 === 0 ? 'aspect-3/4' : 'aspect-4/5'

        if (slot.kind === 'more') {
            return (
                <div key="more">
                    <button
                        type="button"
                        onClick={openMore}
                        className="group flex aspect-3/4 w-full cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-silver bg-paper text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
                    >
                        <span className="font-display text-4xl sm:text-5xl">+{remaining}</span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.24em]">Xem thêm ảnh</span>
                        <span
                            className="mt-1 flex h-10 w-10 items-center justify-center border border-current transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none"
                            aria-hidden="true"
                        >
                            <ArrowIcon width={16} height={16} />
                        </span>
                    </button>
                    <span className="mt-2 block px-0.5 text-[11px] tracking-[0.2em] text-mute">{photos.length} ảnh</span>
                </div>
            )
        }

        const photo = photos[slot.index]
        return (
            <button
                key={photo.src}
                type="button"
                onClick={() => setActive(slot.index)}
                className="group block w-full cursor-zoom-in text-left"
                aria-label={`Xem ảnh lớn: ${photo.alt}`}
            >
                <span className={`relative block overflow-hidden bg-line ${aspect}`}>
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" aria-hidden="true" />
                </span>
                <span className="mt-2 flex items-center justify-between px-0.5 text-[11px] tracking-[0.2em] text-mute">
                    <span className="font-display italic">#{String(slot.index + 1).padStart(2, '0')}</span>
                    <span className="transition-colors duration-300 group-hover:text-ink">
                        <ZoomIcon />
                    </span>
                </span>
            </button>
        )
    }

    const renderColumns = (columns: ReturnType<typeof buildColumns>, remaining: number) =>
        columns.map((col, c) => (
            <div
                key={c}
                data-reveal="up"
                style={{ '--reveal-delay': `${c * 120}ms` } as React.CSSProperties}
                className={`flex flex-col gap-5 lg:gap-6 ${col.offset}`}
            >
                {col.items.map((slot, i) => renderSlot(slot, c + i, remaining))}
            </div>
        ))

    return (
        <>
            {/* Mobile/tablet: 2 cột so le */}
            <div className="grid grid-cols-2 items-start gap-3 sm:gap-6 lg:hidden">
                {renderColumns(mobileColumns, photos.length - mobileCount)}
            </div>

            {/* Desktop: 4 cột so le */}
            <div className="hidden grid-cols-4 items-start gap-6 lg:grid">
                {renderColumns(desktopColumns, photos.length - desktopCount)}
            </div>

            {active !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Xem ảnh"
                    className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95"
                    onClick={close}
                >
                    <div
                        key={active}
                        className="lightbox-fade relative h-[82svh] w-[92vw] max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={photos[active].src}
                            alt={photos[active].alt}
                            fill
                            sizes="92vw"
                            className="object-contain"
                        />
                    </div>

                    <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-silver">
                        {String(active + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                    </p>

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Đóng"
                        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center text-paper transition-opacity hover:opacity-70"
                    >
                        <CloseIcon width={24} height={24} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            step(-1)
                        }}
                        aria-label="Ảnh trước"
                        className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center text-paper transition-opacity hover:opacity-70 sm:left-6"
                    >
                        <ChevronIcon width={28} height={28} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            step(1)
                        }}
                        aria-label="Ảnh tiếp theo"
                        className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center text-paper transition-opacity hover:opacity-70 sm:right-6"
                    >
                        <ChevronIcon width={28} height={28} />
                    </button>
                </div>
            )}
        </>
    )
}

export default LookbookGallery
