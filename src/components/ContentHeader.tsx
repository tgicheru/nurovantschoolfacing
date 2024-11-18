import React from 'react'

type ContentHeaderProps = {
    headerText: string,
    subText: string
}

export const ContentHeader = ({headerText, subText}: ContentHeaderProps) => {
  return (
    <div className="flex flex-col gap-[5px] mb-[25px]">
        <h1 className="text-neutral-900 text-[24px] leading-[32px] font-bold">
          {headerText}
        </h1>
        <p className="text-sm font-semibold text-neutral-600">
          {subText}
        </p>
      </div>
  )
}
