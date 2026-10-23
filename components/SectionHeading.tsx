import React from 'react'

interface SectionHeadingProps {
    eyebrow: string
    title: React.ReactNode
    description?: string
    align?: 'left' | 'center'
    tone?: 'light' | 'dark'
    className?: string
}

// Cụm tiêu đề chuẩn của mọi section: nhãn nhỏ → tiêu đề serif → mô tả
const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = 'left',
    tone = 'light',
    className = '',
}: SectionHeadingProps) => {
    const isCenter = align === 'center'
    const isDark = tone === 'dark'

    return (
        <div className={`${isCenter ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
            <p
                data-reveal="up"
                className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] ${isCenter ? 'justify-center' : ''} ${isDark ? 'text-silver' : 'text-mute'}`}
            >
                {/* Hai gạch tự vẽ về phía chữ khi nhãn hiện */}
                <span className={`reveal-line reveal-line-end h-px w-8 ${isDark ? 'bg-silver' : 'bg-mute'}`} />
                {eyebrow}
                {isCenter && <span className={`reveal-line h-px w-8 ${isDark ? 'bg-silver' : 'bg-mute'}`} />}
            </p>
            <h2
                data-reveal="blur"
                style={{ '--reveal-delay': '100ms' } as React.CSSProperties}
                className={`mt-5 font-display text-[2rem] leading-[1.15] text-balance sm:text-4xl lg:text-[2.875rem] ${isDark ? 'text-paper' : 'text-ink'}`}
            >
                {title}
            </h2>
            {description && (
                <p
                    data-reveal="up"
                    style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
                    className={`mt-5 text-[15px] leading-relaxed text-pretty sm:text-base ${isDark ? 'text-silver' : 'text-mute'}`}
                >
                    {description}
                </p>
            )}
        </div>
    )
}

export default SectionHeading
