'use client'

import { useEffect } from 'react'

// Hiệu ứng chạy lại mỗi lần cuộn tới (cả cuộn xuống lẫn cuộn lên):
// - [data-reveal]: thêm is-revealed khi vào màn hình, gỡ ra khi đã ra HẲN ngoài màn hình
//   (không gỡ khi còn thấy để tránh phần tử tự mờ đi trước mắt người xem).
// - [data-replay="<class>"]: khối chạy animation bằng keyframe (vd. Hero) — gỡ class khi ra khỏi
//   màn hình, gắn lại khi quay vào để keyframe chạy lại từ đầu.
const RevealOnScroll = () => {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
        const replays = document.querySelectorAll<HTMLElement>('[data-replay]')

        // Hiện: phải vào hẳn màn hình (bỏ qua 10% đáy) mới chạy
        const showObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('is-revealed')
                })
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
        )

        // Đặt lại: chỉ khi không còn pixel nào trong khung nhìn thật
        const resetObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement
                const replayClass = el.dataset.replay
                if (replayClass) {
                    el.classList.toggle(replayClass, entry.isIntersecting)
                } else if (!entry.isIntersecting) {
                    el.classList.remove('is-revealed')
                }
            })
        })

        elements.forEach((el) => {
            showObserver.observe(el)
            resetObserver.observe(el)
        })
        replays.forEach((el) => resetObserver.observe(el))

        return () => {
            showObserver.disconnect()
            resetObserver.disconnect()
        }
    }, [])

    return null
}

export default RevealOnScroll
