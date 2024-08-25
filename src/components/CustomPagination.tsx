import { Pagination } from 'antd'
import React from 'react'
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

type Props = {
  total: number,
  onChange?: any,
  current: number,
  hidden?: boolean,
  pageSize?: number,
  onSizeChange?: any,
  sizeChanger?: boolean,
  defaultCurrent?: number,
  defaultPageSize?: number,
  size?: "small" | "default",
}
function CustomPagination({
  size,
  total,
  hidden,
  current,
  onChange,
  pageSize,
  sizeChanger,
  onSizeChange,
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
        onShowSizeChange={onSizeChange}
        defaultPageSize={defaultPageSize}
        className='!w-full md:flex justify-center items-center gap-2 border-0'
        showTotal={(total, range) => <p className='hidden md:block'>Showing {range[0]}-{range[1]} of  {total} results</p>}
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