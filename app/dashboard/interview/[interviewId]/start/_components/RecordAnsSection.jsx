"use client"
import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import React from 'react'
import Webcam from 'react-webcam';
import Image from 'next/image';
import {Button} from '@/components/ui/button'
import { Mic } from 'lucide-react';

function RecordAnsSection() {
  const [userAnswer, setUserAnswer] = useState('');

  const {
      error,
      interimResult,
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
    } = useSpeechToText({
      continuous: true,
      useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript),
    ))
  }, [results])

  console.log("Speech Recognition API initialized:", window.SpeechRecognition || window.webkitSpeechRecognition);
  console.log("Is Recording:", isRecording);
  console.log("Error:", error);

  
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
        <Button variant="outline" className='my-10' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {
            isRecording ?
            <h2 className='text-red-500 flex gap-2'>
              <Mic>Stop Recording</Mic>
            </h2>
            :
            'Record Answer'
          }
        </Button>

        <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
    </div>
  )
}

export default RecordAnsSection