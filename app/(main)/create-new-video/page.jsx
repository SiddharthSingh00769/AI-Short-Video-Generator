"use client"
import { useState } from 'react'
import React from 'react'
import Topic from './_components/Topic'

function CreateNewVideo() {

  const [formData, setFormData] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
    console.log(formData);
  }


  return (
    <div>
        <h2 className='text-3xl font-bold'>Create New Video</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-8'>
            <div className='col-span-2 p-7 border rounded-xl'>
                <Topic onHandleInputChange={onHandleInputChange}/>
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default CreateNewVideo
