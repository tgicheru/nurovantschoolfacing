import React from 'react'

type Props = {
    color?: string,
    bg?: string,
}
function DiscussIcon({
    color,
    bg,
}: Props) {
    return (
        <svg width="201" height="202" viewBox="0 0 201 202" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2527_24554)">
                <path d="M29.1675 132.852C29.5044 131.519 29.0452 130.11 27.9871 129.232C13.0442 116.832 4.06727 100.168 4.06727 82.0005C4.06727 44.9102 41.9793 13.5678 90.5 13.5678C139.021 13.5678 176.933 44.9102 176.933 82.0005C176.933 119.091 139.021 150.433 90.5 150.433C79.1641 150.433 68.3664 148.698 58.4542 145.568C57.262 145.191 55.9596 145.466 55.0215 146.293C47.0358 153.33 39.8846 158.806 31.5474 162.565C25.2153 165.42 18.078 167.337 9.2299 168.083C16.9782 159.61 25.2321 148.423 29.1675 132.852Z" fill={bg} stroke={color} stroke-width="7.13455" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <filter id="filter0_d_2527_24554" x="0.0127287" y="0" width="200" height="209.025" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="9.51273" dy="19.0255"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2527_24554"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2527_24554" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}

export default DiscussIcon