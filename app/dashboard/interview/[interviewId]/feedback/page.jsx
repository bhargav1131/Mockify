"use client"
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import {eq} from 'drizzle-orm'
import {db} from "@/utils/db"
import {UserAnswer} from "@/utils/schema"
import {Collapsible,CollapsibleContent,CollapsibleTrigger} from "@/components/ui/collapsible"
import {Button} from '@/components/ui/button'
import {ChevronsUpDown} from 'lucide-react';

function feedback({params}) {
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        GetFeedback();
    },[])
    
    const GetFeedback=async()=>{
        // get user answers by interview id
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);

        // console.log(result);
        setFeedbackList(result);
    }

  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500'>Well Done!</h2>
        <h2 className='font-bold text-2xl'>Here is the feedback for Your Interview</h2>

    {
        feedbackList?.length==0?
        <h2 className='text-red-500 font-bold'>No feedback available!</h2>
        :
        <>
        <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

        <h2 className='text-sm text-gray-500'>Below are the interview questions along with the correct answers, your responses, and feedback for further improvement.</h2>
        {feedbackList&&feedbackList.map((feedback, index)=>(
            <Collapsible key={index} className='mt-8'>
                <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-8 w-full'>
                    {feedback.question} <ChevronsUpDown className='h-4 w-5'/>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-red-500 border rounded-lg'><strong>Rating:</strong>{feedback.rating}</h2>

                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-800'><strong>Your Answer: </strong>{feedback.userAns}</h2>

                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-800'><strong>Correct Answer: </strong>{feedback.correctAns}</h2>

                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{feedback.feedback}</h2>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        ))}

      </>  
    }
        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default feedback