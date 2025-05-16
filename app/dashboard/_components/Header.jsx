"use client"
import React from 'react'
import Image from 'next/image'
import {UserButton} from '@clerk/nextjs'
import {usePathname} from 'next/navigation'
import {useEffect} from 'react'
import Link from 'next/link';


function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    },[path])


  return (
    <div className="flex p-3 items-center justify-between bg-secondary shadow-sm">
        <Image src={'/logo.svg'} width={160} height={100} alt="logo"></Image>
        <ul className='hidden md:flex gap-5'>
        <li>
            <Link href="/dashboard" className={`hover:text-primary hover:font-bold transition-all ${path === '/dashboard' && 'text-primary font-bold'}`}>
            Dashboard
          </Link>
        </li>

 
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard/about' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/about">About Us</Link>
         </li>

            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path=='/dashboard/how' && 'text-primary font-bold'}  
            `}>How It works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header