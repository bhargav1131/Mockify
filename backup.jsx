"use client"
import React, {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function AddNewInterview() {
  const [openDialog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();

  const onSubmit=(e)=>{

    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
    setOpenDailog(false);
  }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer' onClick={() => setOpenDailog(true)}>
            <h2 className='text-lg'>+ Add New</h2>
        </div>

        <Dialog open={openDialog}>
          <DialogContent className='max-w-2xl'>
             <DialogHeader>
               <DialogTitle className='text-2xl'>Tell us more about your job interviewing</DialogTitle>
                 <DialogDescription>
                  <form onSubmit={onSubmit}>
                    <div>                     
                      <h2>Add details about your job position/role, Job description and years of experience</h2>
                        <div className='mt-7 my-3'>
                            <label>Job Role/Job Position</label>
                            <Input placeholder="Ex. Full Stack Developer" required onChange={(event)=> setJobPosition(event.target.value)}/>
                        </div>

                        <div className='mt-7 my-3'>
                            <label>Job Description/Tech Stack(in short)</label>
                            <Textarea placeholder="Ex. React, Angular, Flutter, Laravel, SpringBoot etc." required onChange={(event)=> setJobDesc(event.target.value)}/>
                        </div>

                        <div className='mt-7 my-3'>
                            <label>No. of years of experience</label>
                            <Input placeholder="Ex. 3" type="number" required onChange={(event)=> setJobExperience(event.target.value)}/>
                        </div>
                    </div>
                  <div className='flex gap-5 justify-end'>
                    <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type="submit">Start</Button>
                  </div>
                  </form>
                </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview