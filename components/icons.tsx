import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement>

const base: IconProps = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
}

export const PhoneIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

export const ChatIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.4 9.4 0 0 1-3.9-.8L3 20.5l1.4-4.2A8.1 8.1 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" />
    </svg>
)

export const FacebookIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
)

export const PinIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)

export const ArrowIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

export const CloseIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M6 18L18 6M6 6l12 12" />
    </svg>
)

export const ChevronIcon = (props: IconProps) => (
    <svg {...base} {...props}>
        <path d="M9 6l6 6-6 6" />
    </svg>
)
