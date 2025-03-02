import Image from 'next/image';
import React from 'react';
import { options } from './VideoStyle';

function Preview({ formData }) {
    const selectVideoStyle = formData && options.find(item => item?.name === formData?.videoStyle);

    return (
        <div className='relative'>
            <h2 className='mb-3 text-2xl'>Preview</h2>
            {selectVideoStyle?.image ? (
                <Image 
                    src={selectVideoStyle.image} 
                    alt={selectVideoStyle.name} 
                    width={1000} 
                    height={300} 
                    className='w-full h-[66vh] object-cover rounded-xl'
                />
            ) : (
                <p>Please select a video style.</p>
            )}

            <h2 className={`${formData?.caption?.style} absolute bottom-7 text-center w-full`}>{formData?.caption?.name}</h2>
        </div>
    );
}

export default Preview;