import QUESTIONS from '../data/questions';
import { scoreValue } from './scoring';

const handleSubmit = (answers, setScoreSummary, setShowModal) => {
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
        setTimeout(() => alert('Please answer all questions before submitting.'), 200);
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

    const history = JSON.parse(localStorage.getItem('processHistory')) || [];
    history.push(summary);
    localStorage.setItem('processHistory', JSON.stringify(history));
    localStorage.removeItem('processAnswers');

    setScoreSummary({
        total,
        offense: Math.round(offensePct),
        defense: Math.round(defensePct),
        culture: Math.round(culturePct)
    });

    setShowModal(true);
};

export default handleSubmit;
