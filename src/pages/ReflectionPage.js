import React, { useReducer, useEffect } from 'react';
import SectionBlock from '../components/SectionBlock';
import { scoreValue } from '../helpers/scoring';

const QUESTIONS = {
  offense: [
    "Did I get into the paint before taking a shot?",
    "Did I move the ball with at least 3+ passes before we shot?",
    "Did I take smart shots — ones we practice?",
    "Did I make the 'one more' pass when a teammate was more open?"
  ],
  defense: [
    "Did I stay in a stance and contest every shot?",
    "Did I talk on defense — on screens and switches?",
    "Did I help on defense and recover to my man?",
    "Did I box out and go for every rebound?"
  ],
  teamIdentity: [
    "Was I a great teammate — vocal, positive, and unselfish?",
    "Did I communicate on defense (screens, cutters, switches)?",
    "Did I give full effort — hustle plays, box-outs, deflections?",
    "Did I avoid bad turnovers (no lazy passes or over-dribbling)?"
  ]
};

function ReflectionPage() {
  const answersReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ANSWER':
        return { ...state, [action.key]: action.value };
      case 'RESET':
        return {};
      default:
        return state;
    }
  };

  const [answers, dispatch] = useReducer(answersReducer, {}, () => JSON.parse(localStorage.getItem('processAnswers')) || {});

  useEffect(() => {
    localStorage.setItem('processAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (section, idx, value) => {
    const key = `${section}-${idx}`;
    dispatch({ type: 'SET_ANSWER', key, value });
  };

  const handleSubmit = () => {
    const allAnswered = Object.keys(QUESTIONS).every(section =>
        QUESTIONS[section].every((_, idx) => answers[`${section}-${idx}`])
    );

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

    const offense = QUESTIONS.offense.reduce((acc, _, i) => acc + scoreValue(answers[`offense-${i}`]), 0);
    const defense = QUESTIONS.defense.reduce((acc, _, i) => acc + scoreValue(answers[`defense-${i}`]), 0);
    const culture = QUESTIONS.teamIdentity.reduce((acc, _, i) => acc + scoreValue(answers[`teamIdentity-${i}`]), 0);
    const total = Math.round(offense + defense + culture);

    const summary = {
      timestamp: new Date().toISOString(),
      total,
      offense: Math.round(offense),
      defense: Math.round(defense),
      teamIdentity: Math.round(culture),
      answers: { ...answers }
    };

    const history = JSON.parse(localStorage.getItem("processHistory")) || [];
    history.push(summary);
    localStorage.setItem("processHistory", JSON.stringify(history));
    localStorage.removeItem("processAnswers");
    window.location.href = '/results';
  };

  return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 tracking-wide uppercase mb-8">PROCESS REFLECTION</h1>
        <SectionBlock
            title="Offense"
            questions={QUESTIONS.offense}
            sectionKey="offense"
            answers={answers}
            handleAnswer={handleAnswer}
        />
        <SectionBlock
            title="Defense"
            questions={QUESTIONS.defense}
            sectionKey="defense"
            answers={answers}
            handleAnswer={handleAnswer}
        />
        <SectionBlock
            title="Team Identity & Culture"
            questions={QUESTIONS.teamIdentity}
            sectionKey="teamIdentity"
            answers={answers}
            handleAnswer={handleAnswer}
        />
        <div className="mt-6 flex justify-between gap-4">
          <button onClick={handleSubmit} className="flex-1 bg-indigo-700 text-white px-6 py-3 rounded hover:bg-indigo-600">Submit Reflection</button>
          <button onClick={() => window.location.href='/stats'} className="flex-1 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500">Player Stats</button>
        </div>
      </div>
  );
}

export default ReflectionPage;
