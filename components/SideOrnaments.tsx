import React from 'react'

// Hoạ tiết nét vẽ tay (viewBox 64×64, chỉ stroke) — chủ đề studio ảnh & các concept của AIM
const doodles = {
    camera: (
        <>
            <path d="M10 22 Q9.5 19.5 12.5 20 L22 20 L26 14.5 L38 14 L42.5 20 L52 19.5 Q55 20 54.5 23 L54 48 Q54 51.5 50.5 51 L13 51.5 Q10 51 10.5 48 Z" />
            <path d="M32 25 C38 25 42 29 42 35 C42 41 37 45 32 45 C26 45 22 40.5 22 35 C22 29.5 26.5 25.2 31 25.4" />
            <path d="M32 31.5 C34 31.5 35.5 33 35.5 35 C35.5 37 34 38.5 32 38.5 C30 38.5 28.6 37 28.6 35.1" />
            <path d="M47 26 l0.1 0" strokeWidth="3" />
        </>
    ),
    lotus: (
        <>
            <path d="M32 46 C25 36 27 24 32 16 C37 24 39 36 32 46 Z" />
            <path d="M32 46 C22 44 15 36 14 27 C22 28 29 35 32 46" />
            <path d="M32 46 C42 44 49 36 50 27 C42 28 35 35 32 46" />
            <path d="M12 51 Q22 47 32 51 T52 50" />
        </>
    ),
    sparkle: (
        <>
            <path d="M32 10 C33 24 36 29 50 32 C36 35 33 40 32 54 C31 40 28 35 14 32 C28 29 31 24 32 10 Z" />
            <path d="M50 11 l0.5 9 M46 15.5 l9 0" />
        </>
    ),
    umbrella: (
        <>
            <path d="M8 30 C14 13 50 13 56 30" />
            <path d="M8 30 Q14 26 20 30 Q26 26 32 30 Q38 26 44 30 Q50 26 56 30" />
            <path d="M32 15 L20 29 M32 15 L32 29 M32 15 L44 29" />
            <path d="M32 30 L32 52 Q32 56.5 27.5 55" />
        </>
    ),
    butterfly: (
        <>
            <path d="M32 30 C24 14 10 16 12 26 C13 32 22 33 32 32 C22 34 14 40 18 47 C22 52 30 44 32 34" />
            <path d="M32 30 C40 14 54 16 52 26 C51 32 42 33 32 32 C42 34 50 40 46 47 C42 52 34 44 32 34" />
            <path d="M32 24 L32 44 M32 25 C30 19 27 17 25 16 M32 25 C34 19 37 17 39 16" />
        </>
    ),
    heart: (
        <path d="M32 50 C22 42 12 35 13 25 C14 17 24 15 29 22 C31 25 32 27 32 27 C33 23 37 16 44 17 C52 18 53 28 49 34 C45 40 38 45 32 50 Z" />
    ),
    film: (
        <>
            <path d="M20 8 L44 9 L43 56 L21 55 Z" />
            <path d="M25.5 14 L38.5 14.5 L38.5 30 L25.5 29.5 Z M25.5 34 L38.5 34.5 L38 50 L25.5 49.5 Z" />
            <path d="M22.7 11 L22.5 53 M41.5 11.5 L41.3 53" strokeDasharray="2 4" />
        </>
    ),
    feather: (
        <>
            <path d="M20 54 C22 40 30 22 46 10 C48 24 40 40 24 50" />
            <path d="M20 54 L42 16 M28 40 L36 38 M32 32 L40 30 M26 46 L32 45" />
        </>
    ),
    polaroid: (
        <>
            <path d="M14 12 L50 10 L52 54 L16 55 Z" />
            <path d="M19 16 L46 15 L47 42 L20 43 Z" />
            <path d="M24 37 L31 28 L36 33 L39 30 L44 37" />
        </>
    ),
    pin: (
        <>
            <path d="M32 54 C24 42 18 34 18 26 C18 17 25 11 32 11 C40 11 46 17 46 26 C46 34 40 42 32 54 Z" />
            <path d="M32 20 C35.5 20 38 22.5 38 26 C38 29.5 35.5 32 32 32 C28.5 32 26 29.5 26 26 C26 23 28 20.6 31 20.2" />
        </>
    ),
    chat: (
        <>
            <path d="M12 18 C12 13 16 11 21 11 L44 11 C49 11 52 14 52 19 L52 34 C52 39 49 42 44 42 L28 42 L18 51 L20 42 C15 42 12 39 12 35 Z" />
            <path d="M24 27 l0.1 0 M32 27 l0.1 0 M40 27 l0.1 0" strokeWidth="3" />
        </>
    ),
    phone: (
        <path d="M20 12 C16 13 13 17 14 22 C17 36 28 47 42 50 C47 51 51 48 52 44 L46 38 C44 37 42 37 41 39 L38 42 C31 39 25 33 22 26 L25 23 C27 22 27 20 26 18 Z" />
    ),
}

type Doodle = keyof typeof doodles
type Variant = 'story' | 'lookbook' | 'contact'

// Mỗi bên 3 hoạ tiết: trên – giữa – dưới
const sets: Record<Variant, { left: Doodle[]; right: Doodle[] }> = {
    story: { left: ['camera', 'lotus', 'sparkle'], right: ['umbrella', 'butterfly', 'heart'] },
    lookbook: { left: ['film', 'feather', 'sparkle'], right: ['polaroid', 'heart', 'lotus'] },
    contact: { left: ['pin', 'chat', 'sparkle'], right: ['phone', 'heart', 'camera'] },
}

const slots = [
    { position: 'top-[12%]', rotate: '-rotate-6', delay: '0s' },
    { position: 'top-[46%]', rotate: 'rotate-6', delay: '-3s' },
    { position: 'bottom-[12%]', rotate: '-rotate-3', delay: '-6s' },
]

// Hoạ tiết vẽ tay ở hai mép dọc màn hình. Chỉ hiện khi lề hai bên đủ rộng (≥ 1400px) để không đè nội dung.
// Section cha cần `relative overflow-hidden`.
const SideOrnaments = ({ variant, tone = 'light' }: { variant: Variant; tone?: 'light' | 'dark' }) => {
    const color = tone === 'dark' ? 'text-paper/25' : 'text-silver'

    const renderSide = (items: Doodle[], side: 'left' | 'right') =>
        items.map((name, i) => {
            const slot = slots[i]
            // Lệch nhẹ ra/vào mép cho tự nhiên như vẽ tay
            const offset = side === 'left' ? (i % 2 ? 'left-10' : 'left-6') : i % 2 ? 'right-6' : 'right-10'
            return (
                <svg
                    key={`${side}-${name}`}
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // rotate/scale (thuộc tính riêng) không đè transform của animation trôi nhẹ
                    className={`doodle-float absolute h-14 w-14 ${slot.position} ${offset} ${slot.rotate} ${side === 'right' ? '-scale-x-100' : ''}`}
                    style={{ animationDelay: slot.delay }}
                >
                    {doodles[name]}
                </svg>
            )
        })

    return (
        <div aria-hidden className={`pointer-events-none absolute inset-0 hidden min-[1400px]:block ${color}`}>
            {renderSide(sets[variant].left, 'left')}
            {renderSide(sets[variant].right, 'right')}
        </div>
    )
}

export default SideOrnaments
