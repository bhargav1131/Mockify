"use client"
import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import React from 'react'
import Webcam from 'react-webcam';
import Image from 'next/image';
import {Button} from '@/components/ui/button'
import { Mic } from 'lucide-react';
import { toast } from "sonner"
import {chatSession} from "@/utils/GeminiAiModal"

function RecordAnsSection(mockInterviewQuestion,activeQuestionIndex, interviewData) {
  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();

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

  const SaveUserAnswer=async()=>{
    if(isRecording){
      stopSpeechToText();
      if(userAnswer?.length <10){
        toast('Error while saving your answer, Please try again');
        return;
      }

      const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+","+"User Answer:"+userAnswer+", Depends on question and user answer for given interview question"+"Please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to miprove in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');

      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(userAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      })
    }

    else{
      startSpeechToText();
    }
  }
  
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
        <Button variant="outline" className='my-10' onClick={SaveUserAnswer}>
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