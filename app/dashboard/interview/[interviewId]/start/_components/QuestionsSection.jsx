import React from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  console.log('mockInterviewQuestion:', mockInterviewQuestion);
  const questions = mockInterviewQuestion?.interview_questions || [];

  
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry! Your browser does not support text-to-speech');
    }
  };
  if (questions.length === 0) {
    return <p className="text-center text-muted">Loading questions or no questions available.</p>;
  }

  return questions.length > 0 && (
    <div className="p-5 border rounded-lg my-11">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {questions.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index && 'bg-primary text-primary font-extrabold'}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">{questions[activeQuestionIndex]?.question}</h2>
      <Volume2 className="cursor-pointer" onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)} />

      <div className="border rounded-lg p-5 bg-blue-100 mt-18">
        <h2 className="flex gap-3 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          Click "Record Answer" when you're ready to respond. Once you've completed all the questions, you'll receive feedback, including the correct answers and a comparison with your responses.
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;