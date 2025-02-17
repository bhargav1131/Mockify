"use client"
import React, { useEffect } from 'react'
import {eq} from 'drizzle-orm'
import {db} from "@/utils/db"
import {UserAnswer} from "@/utils/schema"

function feedback({params}) {
    const [feedbackList, setFeedbackList] = useState([]);

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
        <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

        <h2 className='text-sm text-gray-500'>Below are the interview questions along with the correct answers, your responses, and feedback for further improvement.</h2>
    </div>
  )
}

export default feedback