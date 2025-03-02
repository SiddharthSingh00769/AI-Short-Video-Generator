"use client"
import { useState } from 'react'
import React from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle'
import Voice from './_components/Voice'
import Captions from './_components/Captions'
import { Button } from '@/components/ui/button'
import { WandSparkles } from 'lucide-react'
import Preview from './_components/Preview'

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
        <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-7'>
            <div className='col-span-2 p-7 border rounded-xl h-[71vh] overflow-auto'>
                <Topic onHandleInputChange={onHandleInputChange}/>

                <VideoStyle onHandleInputChange={onHandleInputChange}/>

                <Voice onHandleInputChange={onHandleInputChange}/>

                <Captions onHandleInputChange={onHandleInputChange}/>

                <Button className="w-full mt-5"><WandSparkles/> Generate Video</Button>
            </div>
            <div>
              <Preview formData={formData}/>
            </div>
        </div>
    </div>
  )
}

export default CreateNewVideo
