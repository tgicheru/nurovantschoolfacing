import React, { ReactComponentElement } from 'react'
import { Image } from 'antd'
import icon from "../assets/EmptyState.svg";

type Props = {
  hidden?: boolean,
  className?: string,
  description?: string,
  children?: ReactComponentElement<any>,
}
function EmptyDisplay({
  description,
  className,
  children,
  hidden,
}: Props) {
  return (
    <div hidden={hidden} className='w-full h-full'>
      <div className={'w-full h-full flex flex-col justify-center items-center gap-5 text-center '.concat(String(className))}>
        <Image src={icon} alt="empty display" preview={false} />
        <p className="text-base font-bold text-[#161617]" dangerouslySetInnerHTML={{__html: description || "You don’t have any material <br /> created yet"}} />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default EmptyDisplay