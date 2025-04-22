import React, { useReducer, useEffect, useState } from 'react';
import ReflectionModal from '../components/ReflectionModal';
import SectionBlock from '../components/SectionBlock';

import QUESTIONS from '../data/basketball/questions';
import answersReducer from '../reducers/answersReducer';
import handleSubmit from '../helpers/handleSubmit';

function ReflectionPage() {
  const [showModal, setShowModal] = useState(false);
  const [scoreSummary, setScoreSummary] = useState(null);

  const [answers, dispatch] = useReducer(answersReducer, {}, () => JSON.parse(localStorage.getItem('processAnswers')) || {});

  useEffect(() => {
    localStorage.setItem('processAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (section, idx, value) => {
    const key = `${section}-${idx}`;
    dispatch({ type: 'SET_ANSWER', key, value });
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 tracking-wide uppercase mb-8">PROCESS REFLECTION</h1>
          <SectionBlock
              title={<>Offense <span className="text-sm text-gray-500">(5 required)</span></>}
              questions={QUESTIONS.offense}
              sectionKey="offense"
              answers={answers}
              handleAnswer={handleAnswer}
              bgClass="from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
          />
          <SectionBlock
              title={<>Defense <span className="text-sm text-gray-500">(5 required)</span></>}
              questions={QUESTIONS.defense}
              sectionKey="defense"
              answers={answers}
              handleAnswer={handleAnswer}
              bgClass="from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
          />
          <SectionBlock
              title={<>Team Identity & Culture <span className="text-sm text-gray-500">(5 required)</span></>}
              questions={QUESTIONS.teamIdentity}
              sectionKey="teamIdentity"
              answers={answers}
              handleAnswer={handleAnswer}
              bgClass="from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
          />
          <div className="mt-6 flex justify-between gap-4">
            <button onClick={() => handleSubmit(answers, setScoreSummary, setShowModal)} className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-600">Submit Reflection</button>
            <button onClick={() => window.location.href='/'} className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500">Back Home</button>

          </div>
          {showModal && scoreSummary && (
              <ReflectionModal
                  total={scoreSummary.total}
                  offense={scoreSummary.offense}
                  defense={scoreSummary.defense}
                  culture={scoreSummary.culture}
                  onClose={() => window.location.href = '/'}
              />
          )}
        </div>
      </div>
  );
}

export default ReflectionPage;
