import React, { useState } from 'react'
import { isEqual } from '../../../context/utils'
import { Button } from 'antd'

function GradeSection({
  payload,
  handleNext,
}:{ payload?: any; handleNext: any }) {
  const [selectedGrade, setSelectedGrade] = useState(payload?.teaching_grade || "")

  const grades = [
    { key: "elementary_school", grade: "grade 1-5" },
    { key: "middle_school", grade: "grade 6-8" },
    { key: "high_school", grade: "grade 9-12" },
    { key: "higher_education", grade: "university" },
  ]

  const handleSubmit = () => handleNext({teaching_grade: selectedGrade})
  return (
    <div className='flex flex-col justify-center items-center text-center gap-3'>
      <p className='text-2xl font-semibold text-[#1B1B1B]'>What Grade do you teach?</p>
      <p className='text-sm font-normal text-[#1B1B1B]'>You can select more than one</p>
      <div className='w-full grid grid-cols-2 gap-5'>
        {grades?.map(({grade, key}) => {
          const isSelect = isEqual(key, selectedGrade)
          const handleSelect = () => setSelectedGrade(key)
          return (
            <div onClick={handleSelect} className={`border ${isSelect ? "border-primary text-primary" : "border-[#E0E0E0] text-[#414141]"} hover:border-primary hover:text-primary rounded-2xl p-5 space-y-2 cursor-pointer`}>
            <p className='text-base font-semibold capitalize'>{key?.replaceAll("_", " ")}</p>
            <p className='text-base font-semibold capitalize'>({grade})</p>
          </div>
        )})}
      </div>
      <Button onClick={handleSubmit} disabled={!selectedGrade} className="bg-primary !h-[50px] my-5" size="large" block type="primary" shape="round">Next</Button>
    </div>
  )
}

export default GradeSection