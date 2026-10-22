'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronIcon, CloseIcon } from '@/components/icons'

export interface LookbookPhoto {
    src: string
    alt: string
    width: number
    height: number
}

// Lưới masonry + popup xem ảnh lớn (Esc để đóng, ← → để chuyển ảnh)
const LookbookGallery = ({ photos }: { photos: LookbookPhoto[] }) => {
    const [active, setActive] = useState<number | null>(null)

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

    return (
        <>
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-6">
                {photos.map((photo, index) => (
                    <button
                        key={photo.src}
                        type="button"
                        onClick={() => setActive(index)}
                        data-reveal="up"
                        style={{ '--reveal-delay': `${(index % 4) * 90}ms` } as React.CSSProperties}
                        aria-label={`Xem ảnh lớn: ${photo.alt}`}
                        className="group relative mb-4 block w-full cursor-zoom-in overflow-hidden bg-line break-inside-avoid lg:mb-6"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                            className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-104"
                        />
                        <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                    </button>
                ))}
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
