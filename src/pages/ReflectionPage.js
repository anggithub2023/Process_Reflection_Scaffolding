import React, { useReducer, useEffect, useState } from 'react';
import ReflectionModal from '../components/ReflectionModal';
import SectionBlock from '../components/SectionBlock';
import { scoreValue } from '../helpers/scoring';

import QUESTIONS from '../data/questions';

function ReflectionPage() {
  const [showModal, setShowModal] = useState(false);
  const [scoreSummary, setScoreSummary] = useState(null);
  import answersReducer from '../reducers/answersReducer';

const [answers, dispatch] = useReducer(answersReducer, {}, () => JSON.parse(localStorage.getItem('processAnswers')) || {});

useEffect(() => {
  localStorage.setItem('processAnswers', JSON.stringify(answers));
}, [answers]);

const handleAnswer = (section, idx, value) => {
  const key = `${section}-${idx}`;
  dispatch({ type: 'SET_ANSWER', key, value });
};

const handleSubmit = () => {
  const allAnswered = Object.keys(QUESTIONS).every(section => {
    const answeredCount = QUESTIONS[section].filter((_, idx) => answers[`${section}-${idx}`]).length;
    return answeredCount >= 5;
  });

  if (!allAnswered) {
    const allKeys = Object.keys(QUESTIONS).flatMap(section =>
        QUESTIONS[section].map((_, idx) => `${section}-${idx}`)
    );
    const firstUnansweredKey = allKeys.find(key => !answers[key]);
    const scrollTarget = document.getElementById(`card-${firstUnansweredKey}`);
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => alert("Please answer all questions before submitting."), 200);
    return;
  }

  const offenseRaw = QUESTIONS.offense.map((_, i) => scoreValue(answers[`offense-${i}`])).filter(v => v !== null);
  const offense = offenseRaw.slice(0, 5).reduce((acc, val) => acc + val, 0);
  const offensePct = (offense / 10) * 100;
  const defenseRaw = QUESTIONS.defense.map((_, i) => scoreValue(answers[`defense-${i}`])).filter(v => v !== null);
  const defense = defenseRaw.slice(0, 5).reduce((acc, val) => acc + val, 0);
  const defensePct = (defense / 10) * 100;
  const cultureRaw = QUESTIONS.teamIdentity.map((_, i) => scoreValue(answers[`teamIdentity-${i}`])).filter(v => v !== null);
  const culture = cultureRaw.slice(0, 5).reduce((acc, val) => acc + val, 0);
  const culturePct = (culture / 10) * 100;
  const total = Math.round((offensePct + defensePct + culturePct) / 3);

  const summary = {
    timestamp: new Date().toISOString(),
    total,
    offense: Math.round(offensePct),
    defense: Math.round(defensePct),
    teamIdentity: Math.round(culturePct),
    answers: { ...answers }
  };

  const history = JSON.parse(localStorage.getItem("processHistory")) || [];
  history.push(summary);
  localStorage.setItem("processHistory", JSON.stringify(history));
  localStorage.removeItem("processAnswers");

  setScoreSummary({ total, offense: Math.round(offensePct), defense: Math.round(defensePct), culture: Math.round(culturePct) });
  setShowModal(true);
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
          <button onClick={handleSubmit} className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-600">Submit Reflection</button>
          <button onClick={() => window.location.href='/'} className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500">Back Home</button>

        </div>
        {showModal && scoreSummary && (
            <ReflectionModal
                total={scoreSummary.total}
                offense={scoreSummary.offense}
                defense={scoreSummary.defense}
                culture={scoreSummary.culture}
                onClose={() => window.location.href = '/stats'}
            />
        )}
      </div>
    </div>
);
}

export default ReflectionPage;
