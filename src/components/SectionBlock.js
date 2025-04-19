
import React from 'react';

function SectionBlock({ title, questions, sectionKey, answers, handleAnswer }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const key = `${sectionKey}-${idx}`;
          const selected = answers[key];
          return (
            <div
              key={key}
              id={`card-${key}`}
              className="border p-4 rounded shadow-sm bg-white space-y-2"
            >
              <p className="font-medium">{q}</p>
              <div className="flex gap-4">
                {['yes', 'no', 'unsure'].map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(sectionKey, idx, option)}
                    className={`px-4 py-2 rounded border ${
                      selected === option
                        ? 'bg-black text-white font-semibold'
                        : 'bg-gray-100'
                    }`}
                  >
                    {option === 'yes' ? 'YES' : option === 'no' ? 'NO' : 'UNSURE'}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SectionBlock;
