import React from 'react'
import { Button } from '@/components/ui/button'
import Authentication from './Authentication'

function Hero() {
  return (
    <div className='p-10 flex flex-col items-center justify-center mt-24 md:px-20 lg:px-36 xl:px-48'>
      <h2 className='text-6xl font-bold text-center'>AI Short Video Generator</h2>
      <p className='mt-4 text-2xl text-center text-gray-500'>🤖 AI generates scripts, images, and voiceovers in seconds.
        ✨ Create, edit, and publish engaging shorts with ease!
      </p>
      <div className='mt-7 flex gap-8'>
        <Button size="lg" variant="secondary">Explore</Button>
        <Authentication>
          <Button size="lg">Get Started</Button>
        </Authentication>
      </div>
    </div>
  )
}

export default Hero
