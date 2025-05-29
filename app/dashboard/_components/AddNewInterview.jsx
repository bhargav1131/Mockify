"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession} from "@/utils/GeminiAiModal"
import { LoaderCircle } from "lucide-react";
import {db} from "@/utils/db"
import {MockInterview} from "@/utils/schema"
import {v4 as uuidv4} from 'uuid';
import {useUser} from '@clerk/nextjs';
import moment from 'moment'
import { useRouter } from 'next/navigation';
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from"@/components/ui/dialog"

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState([]);
  const {user} = useUser();
  const router=useRouter();

  const onSubmit =async(e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience +" depending on jon position, job description and years of experience give us " + process.env.NEXT_PUBLIC_QUESTIONS_COUNT + " interview questions along with their answers in JSON format. Give us question and answers field on JSON";

    const result=await chatSession.sendMessage(InputPrompt);
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
    // console.log(JSON.parse(MockJsonResp));
    setJsonResp(MockJsonResp);

    if(MockJsonResp){
      const resp = await db.insert(MockInterview).values(
        {
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify({ interview_questions: JSON.parse(MockJsonResp) }),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        }).returning({mockId:MockInterview.mockId});

        // console.log("inserted ID: ", resp)
        if(resp){
          setOpenDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId);
        }
    }
    else{
      console.log("ERROR");
    }
      setLoading(false);
  };

  return (
    <div>
      <div 
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer" 
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
          </DialogHeader>
          <h2 className="mt-2 text-lg">
            Add details about your job position/role, job description, and years of experience
          </h2>

          <form onSubmit={onSubmit} className="mt-2">
            <div className="my-3">
              <label>Job Role/Job Position</label>
              <Input 
                placeholder="Ex. Full Stack Developer" 
                required 
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Job Description/Tech Stack (in short)</label>
              <Textarea 
                placeholder="Ex. React, Angular, Flutter, Laravel, SpringBoot etc." 
                required 
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div className="my-3">
              <label>No. of years of experience</label>
              <Input 
                placeholder="Ex. 3" 
                type="number" 
                required 
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <> <LoaderCircle className='animate-spin'/>Generating from AI</> : "Start"}
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
