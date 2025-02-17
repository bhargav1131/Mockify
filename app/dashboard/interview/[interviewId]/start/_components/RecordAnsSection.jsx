"use client"
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import React from 'react'
import Webcam from 'react-webcam';
import Image from 'next/image';
import {Button} from '@/components/ui/button'
import { Mic } from 'lucide-react';
import { StopCircle } from 'lucide-react';
import { toast } from "sonner"
import {chatSession} from "@/utils/GeminiAiModal"
import {db} from "@/utils/db"
import {UserAnswer} from "@/utils/schema"
import moment from 'moment';

function RecordAnsSection({mockInterviewQuestion,activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const {
      error,
      interimResult,
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
      setResults,
    } = useSpeechToText({
      continuous: true,
      useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript),
    ))
  }, [results])

  useEffect (() => {
    if(!isRecording && userAnswer.length > 10){
      UpdateUserAnswer();
    }
    // if(userAnswer?.length <10)
    //   {
    //     setLoading(false);
    //     toast('Error while saving your answer, Please try again');
    //     return;
    //   }
  },[userAnswer])

  const StartStopRecording=async()=>{
    if(isRecording){
      stopSpeechToText();
    }
    
    else{
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    console.log("MockId:", interviewData.mockId);
    setLoading(true);
    const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+","+"User Answer:"+userAnswer+", Depends on question and user answer for given interview question"+"Please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to miprove in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');

      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values(
        {
        mockIdRef: interviewData.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      })

      if(resp){
        toast('Your answer has been saved successfully');
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
      setLoading(false);
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
        <Button disabled={loading} variant="outline" className='my-10' onClick={StartStopRecording}>
          {
            isRecording ?
            <h2 className='text-red-500 flex gap-2'>
              <StopCircle/>Stop Recording
            </h2>
            :
            <h2 className='text-primary flex gap-2 items-center'>
              <Mic/>Record Answer
            </h2>
          }
        </Button>
    </div>
  )
}

export default RecordAnsSection 