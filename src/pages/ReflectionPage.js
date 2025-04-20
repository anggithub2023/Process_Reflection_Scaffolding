import React, { useReducer, useEffect } from 'react';
import SectionBlock from '../components/SectionBlock';
import { scoreValue } from '../helpers/scoring';

const QUESTIONS = {
  offense: [
    "Did I get into the paint before taking a shot?",
    "Did we move the ball with at least three passes before taking a shot?",
    "Did I take smart shots — ones we practice?",
    "Did I make the 'one more' pass when a teammate was more open?",
    "Did I keep proper spacing and timing in our offense?",
    "Did I stay patient and allow plays to develop before rushing?"
  ],
  defense: [
    "Did I stay in a stance and contest every shot?",
    "Did I talk on defense — on screens and switches?",
    "Did I help on defense and recover to my man?",
    "Did I box out and go for every rebound?",
    "Did I close out under control and avoid fouling shooters?",
    "Did I maintain effort on every defensive possession?"
  ],
  teamIdentity: [
    "Was I a great teammate — vocal, positive, and unselfish?",
    "Did I communicate on defense (screens, cutters, switches)?",
    "Did I give full effort — including hustle plays, box-outs, and deflections?",
    "Did I avoid bad turnovers, such as lazy passes or over-dribbling?",
    "Did I support my teammates on and off the court?",
    "Did I hold myself accountable to our team principles?"
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
    const icon = total >= 95 ? '🔥' : total >= 85 ? '💪' : '🧱';
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class='bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center'>
        <h2 class='text-xl font-bold mb-2'>${icon} Great Job Reflecting</h2>
        <p class='mb-2'>Total Score: ${total}</p>
        <p class='mb-1 text-sm'>Offense: ${Math.round(offense)}</p>
        <p class='mb-1 text-sm'>Defense: ${Math.round(defense)}</p>
        <p class='mb-4 text-sm'>Team Identity: ${Math.round(culture)}</p>
        <p class='mb-4 font-medium'>Champions do the little things.</p>
        <button id='confirmModalBtn' class='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500'>OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('confirmModalBtn').addEventListener('click', () => {
      window.location.href = '/stats';
    });
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 tracking-wide uppercase mb-8">PROCESS REFLECTION</h1>
          <SectionBlock
              title="Offense"
              questions={QUESTIONS.offense}
              sectionKey="offense"
              answers={answers}
              handleAnswer={handleAnswer}
              bgClass="from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
          />
          <SectionBlock
              title="Defense"
              questions={QUESTIONS.defense}
              sectionKey="defense"
              answers={answers}
              handleAnswer={handleAnswer}
              bgClass="from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4"
          />
          <SectionBlock
              title="Team Identity & Culture"
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
        </div>
      </div>
  );
}

export default ReflectionPage;
