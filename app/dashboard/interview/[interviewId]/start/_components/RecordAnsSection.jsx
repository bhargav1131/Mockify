"use client";

import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const questions = mockInterviewQuestion?.interview_questions || [];
  const currentQuestion = questions[activeQuestionIndex];

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
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      // Append only the latest transcript part
      console.log("Speech results: ", results);
      const latestTranscript = results[results.length - 1]?.transcript || "";
      console.log("Transcript joined: ", latestTranscript);
      setUserAnswer((prevAns) => (prevAns ? prevAns + " " + latestTranscript : latestTranscript));
    }
  }, [results]);


  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setTimeout(async() => {
          if (userAnswer.length > 10) {
            await UpdateUserAnswer();
          }      
      }, 1500);
    } 
    else {
      setUserAnswer(""); // Reset previous answer when starting
      setResults([]); // Clear previous speech results
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {

    if (!currentQuestion) {
      console.log("update user answer..");
      toast.error("No current question to answer.");
      return;
    }
    try {
      setLoading(true);

      const feedbackPrompt = `Question: ${currentQuestion.question}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question. Please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve in JSON format with rating field and feedback field`;

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response.text().replace("```json", "").replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: currentQuestion.question,
        correctAns: currentQuestion.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast.success("Your answer has been saved successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (err) {
      // console.error("Error updating user answer:", err);
      toast.error("Failed to save your answer.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image src={"/webcam.jpg"} width={200} height={200} className="absolute" alt="not available" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
            borderRadius: 10,
          }}
        />
      </div>
      <Button disabled={loading} variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
