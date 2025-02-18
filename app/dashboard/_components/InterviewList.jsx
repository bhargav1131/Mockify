"use client";
import React, {useEffect, useState} from 'react';
import {useUser} from '@clerk/nextjs';
import {db} from '@/utils/db';
import {MockInterview} from '@/utils/schema';
import {desc, eq} from 'drizzle-orm';

function InterviewList() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList = async()=>{
        const result = await db.select().from(MockInterview).where(eq(
            MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress
        )).orderBy(desc(MockInterview.id));

        console.log(result);
        setInterviewList(result);
    }

    
    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>
        </div>
    )
}

export default InterviewList