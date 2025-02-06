"use client"
import React, {useEffect, useState} from 'react'
import {db} from "@/utils/db"
import {MockInterview} from "@/utils/schema"
import {eq} from 'drizzle-orm'

function StartInterview({params}) {
    const [inerviewData, setInterviewData] = useState();
    const [MockInterviewQuestion, setMockInterviewQuestion] = useState();

    useEffect(()=>{
        GetInterviewDetails();
    },[])

    // used to get interview details by interview id
    const GetInterviewDetails=async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResp=JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }

  return (
    <div>
        <div>
            
        </div>
    </div>
  )
}

export default StartInterview