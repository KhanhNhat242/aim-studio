'use client'

import { useEffect } from 'react'

// Gắn class is-revealed cho mọi phần tử [data-reveal] khi cuộn tới (hiện một lần)
const RevealOnScroll = () => {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
        )

        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return null
}

export default RevealOnScroll
