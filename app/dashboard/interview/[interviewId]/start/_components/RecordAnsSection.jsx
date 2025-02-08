import React from 'react'
import Webcam from 'react-webcam';
import Image from 'next/image';
import {Button} from '@/components/ui/button'

function RecordAnsSection() {
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam.jpg'} width={200} height={200} className='absolute' alt='not available'/>
            <Webcam
                mirrored={true}
                style={{
                    height:300,
                    width:'100%',
                    zIndex: 10,
                    borderRadius: 10
                }}
            />
        </div>
        <Button variant="outline" className='my-10'>Record Answer</Button>
    </div>
  )
}

export default RecordAnsSection