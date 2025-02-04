import React from 'react'

type Props = {
    color?: string,
    bg?: string,
}
function VideoRecordIcon({
    color,
    bg,
}: Props) {
    return (
        <svg width="284" height="275" viewBox="0 0 284 275" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1706_7963)">
                <path d="M248.117 84.5533L248.155 84.5291C248.878 84.0645 249.717 83.8182 250.638 83.8182H262.332V192.298H250.638C249.829 192.298 248.941 192.055 248.071 191.534L197.97 159.909V116.207L248.117 84.5533ZM172.001 182.525L172.001 182.545C172.048 196.019 161.03 207.082 147.561 207.082H36.9746C23.4887 207.082 12.4182 195.998 12.4182 182.584V93.4164C12.4182 79.9441 23.4886 68.9182 36.9164 68.9182H147.502C160.975 68.9182 172.001 79.9886 172.001 93.4164V182.525Z" fill={bg || "#FCB700"} stroke={color || "#D99725"} stroke-width="10.8364" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_1706_7963" x="0" y="0" width="291" height="303" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="12" dy="24" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1706_7963" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1706_7963" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default VideoRecordIcon