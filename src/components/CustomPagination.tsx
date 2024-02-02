import { Pagination } from 'antd'
import React from 'react'
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

type Props = {
  size?: "small" | "default",
  total: number,
  current: number,
  onChange?: any,
  pageSize: number,
  hidden?: boolean,
  sizeChanger?: boolean,
  defaultCurrent?: number,
  defaultPageSize?: number,
}
function CustomPagination({
  size,
  total,
  hidden,
  current,
  onChange,
  pageSize,
  sizeChanger,
  defaultCurrent,
  defaultPageSize,
}: Props) {
  return (
    <div hidden={hidden} className='w-full md:w-auto'>
      <Pagination
        responsive
        size={size}
        total={total}
        showLessItems
        current={current}
        onChange={onChange}
        pageSize={pageSize||10}
        showSizeChanger={sizeChanger}
        defaultCurrent={defaultCurrent}
        defaultPageSize={defaultPageSize}
        className='!w-full md:flex justify-center items-center gap-2 border-0'
        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of  ${total} results`}
        itemRender={(e, type, originalElement) => {
          if (type === 'page') return <button className={`text-base font-normal`}>{e}</button>
          if (type === 'prev') return ""
          if (type === 'next') return ""
          return originalElement
        }}
      />
    </div>
  )
}

export default CustomPagination