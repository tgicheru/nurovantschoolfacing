import { Image } from 'antd'
import React from 'react'
import videoicon from '../assets/videocallicon.svg'

type Props = {
  description?: string,
  className?: any,
  children?: any,
  title?: string,
  image?: any,
}
function ImageCardContainer({
  description,
  className,
  children,
  title,
  image,
}: Props) {
  return (
    <div className="w-full flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden items-center justify-center">
      <div className="w-full lg:w-[40%] bg-primary h-full bg-pattern bg-no-repeat hidden lg:flex flex-col items-center justify-center gap-[48px] text-white">
        <Image alt={title} src={image || videoicon} preview={false} />
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <p className="text-[44px] leading-[48px] font-bold tracking-[-0.88px] text-center">{title || "Record Live Lectures"}</p>
          <p className="text-[16px] leading-[25px] font-medium tracking-[0.32px] text-center max-w-[427px]">{description || "Capturing Knowledge, One Live Lecture at a Time."}</p>
        </div>
      </div>

      {/* Right Section*/}
      <div className={`w-full lg:w-[60%] ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default ImageCardContainer