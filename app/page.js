"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <Image
          src="/interview.png"
          alt="Mockify Logo"
          width={220}
          height={220}
          className="mx-auto mb-6 rounded-full shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to Mockify !
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Your personal AI-powered mock interviewer. Practice, improve, and ace your next interview.
        </p>
        <Button
          className="text-lg px-6 py-4 rounded-2xl shadow-md"
          onClick={handleRedirect}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
