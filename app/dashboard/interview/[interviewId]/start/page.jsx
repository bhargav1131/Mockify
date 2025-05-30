"use client"
import React, {useEffect, useState} from 'react'
import QuestionsSection from "./_components/QuestionsSection"
import RecordAnsSection from "./_components/RecordAnsSection"
import {db} from "@/utils/db"
import {MockInterview} from "@/utils/schema"
import {eq} from 'drizzle-orm'
import {Button} from '@/components/ui/button'
import Link from 'next/link';

function StartInterview({params}) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[])
    
    // used to get interview details by interview id
    const GetInterviewDetails=async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        console.log("RAW jsonMockResp from DB:", result[0].jsonMockResp);

        const jsonMockResp=JSON.parse(result[0].jsonMockResp);
        console.log("Json: ", jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }


  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* questions part */}
            <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>


            {/* video/audio recording */}
            <RecordAnsSection
               mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
            />
        </div>

        <div className='flex justify-end gap-5'>
            {activeQuestionIndex>0 &&
            <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}

            {activeQuestionIndex!=mockInterviewQuestion?.interview_questions?.length-1 &&
            <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}

            {activeQuestionIndex===mockInterviewQuestion?.interview_questions?.length-1 &&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button>End Interview</Button>
            </Link>}
        </div>
    </div>
  )
}

export default StartInterview