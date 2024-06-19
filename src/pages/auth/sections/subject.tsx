import React, { useState } from 'react'
import { isEqual } from '../../../context/utils'
import { Button } from 'antd'

function SubjectSection({
  payload,
  handleNext,
}:{ payload?: any; handleNext: any }) {
  const [selectedSubject, setSelectedSubject] = useState([...(payload?.teaching_subject || [])])

  const subjects = [
    { key: "english", label: "English" },
    { key: "mathematics", label: "Mathematics" },
    { key: "science", label: "Science" },
    { key: "social_studies", label: "Social Studies" },
    { key: "technology", label: "Technology" },
    { key: "stem_programs", label: "STEM Programs" },
    { key: "others", label: "Others" },
  ]

  const handleSubmit = () => handleNext({teaching_subject: selectedSubject})
  return (
    <div className='flex flex-col justify-center items-center text-center gap-3'>
      <p className='text-2xl font-semibold text-[#1B1B1B]'>What subject do you teach?</p>
      <p className='text-sm font-normal text-[#1B1B1B]'>You can select more than one</p>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-5'>
        {subjects?.map(({label, key}) => {
          const isSelect = selectedSubject?.includes(key)
          const includeData = [...(selectedSubject || []), key]
          const excludeData = selectedSubject?.filter(d => !isEqual(d, key))
          const handleSelect = () => setSelectedSubject(isSelect ? excludeData : includeData)
          return (
            <div onClick={handleSelect} className={`border ${isSelect ? "border-primary text-primary" : "border-[#E0E0E0] text-[#414141]"} hover:border-primary hover:text-primary rounded-2xl p-5 space-y-2 cursor-pointer`}>
              <p className='text-base font-semibold capitalize'>{label}</p>
          </div>
        )})}
      </div>
      <Button onClick={handleSubmit} disabled={!selectedSubject} className="bg-primary !h-[50px] my-5" size="large" block type="primary" shape="round">Next</Button>
    </div>
  )
}

export default SubjectSection