"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Webcam from "react-webcam";
import { Video } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import {db} from "@/utils/db"
import {MockInterview} from "@/utils/schema"
import {eq} from 'drizzle-orm'
import {Button} from '@/components/ui/button'

function Interview({params}) {
    const  [interviewData, setInterviewData] = useState({});
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(()=>{
        GetInterviewDetails();
    },[])

    // used to get interview details by interview id
    const GetInterviewDetails=async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0]);
    }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
        <h2 className='font-bold text-2xl'>Let's get started !</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

            <div className='flex flex-col my-5 gap-5'>
                <div className='flex flex-col p-5 rounded-lg border gap-5'>
                    <h2 className='text-lg'><strong> Job Role/ Job Position: </strong>{interviewData.jobPosition}</h2>
                    <h2 className='text-lg'><strong> Job Description/ Tech Stack: </strong>{interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong> Number of years of experience: </strong>{interviewData.jobExperience}</h2>
                </div>
                <div className='p-5 border rounded-lg gap-5 border-b-rose-400 bg-rose-200'>
                    <h2 className='flex gap-2 items-center'><Lightbulb/> <strong>Information</strong></h2>
                    <h2 className="text-lg text-gray-700 text-justify max-w-2xl leading-relaxed">To begin your AI-powered mock interview, please enable your webcam and microphone. You will be asked a total of seven questions, and at the end, you will receive a detailed performance report based on your responses. Your privacy is our priority—no video recordings are stored, and you can disable webcam access at any time.</h2>
                </div>
            </div>

            <div>
                {webCamEnabled?
                <Webcam onUserMedia={()=>setWebCamEnabled(true)} 
                onUserMediaError={()=>setWebCamEnabled(false)}
                mirrored={true}
                style={{
                    height:300,
                    width:300
                }}
                />
                :
                <>
                    <Video className='h-71 w-full my-7 p-20 bg-secondary rounded-lg border' />
                    <Button variant='ghost' onClick={()=>setWebCamEnabled(true)}>Enable Web cam and Microphone</Button>
                </>
            }
            </div>
        </div>

        <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
              <Button>Start Interview</Button>
            </Link>
        </div>
    </div>
  )
  }

export default Interview