'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const QUESTIONS = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: [
      'Hyper Transfer Markup Language',
      'HyperText Markup Language',
      'HighText Machine Language',
      'HyperText Modern Language',
    ],
    answer: 1,
    explanation: 'HTML stands for HyperText Markup Language. It is the standard language used to create and structure web pages.',
  },
  {
    id: 2,
    question: 'Which CSS property is used to control the spacing between elements outside their border?',
    options: ['padding', 'spacing', 'margin', 'gap'],
    answer: 2,
    explanation: '"margin" controls the space outside an element\'s border. "padding" controls space inside the border, between the content and border.',
  },
  {
    id: 3,
    question: 'In React, which hook is used to manage local component state?',
    options: ['useEffect', 'useContext', 'useRef', 'useState'],
    answer: 3,
    explanation: 'useState is the primary hook for managing local state in functional React components. It returns a state value and a setter function.',
  },
  {
    id: 4,
    question: 'What is the correct way to pass data from a parent to a child component in React?',
    options: ['Via state', 'Via props', 'Via context only', 'Via localStorage'],
    answer: 1,
    explanation: 'Props (short for properties) are the standard mechanism for passing data from a parent component down to a child component in React.',
  },
  {
    id: 5,
    question: 'Which Next.js feature allows you to define page routes by creating files in the "app" directory?',
    options: ['Dynamic Import', 'File-based Routing', 'Server Actions', 'Middleware'],
    answer: 1,
    explanation: 'Next.js uses file-based routing via the App Router. Every folder/file inside the "app" directory automatically becomes a URL route.',
  },
];

const KEYS = ['A', 'B', 'C', 'D'];

function OptionButton({ optionText, optionKey, status, onClick, disabled }) {
  return (
    <button
      className={`option-btn ${status}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="option-key">{optionKey}</span>
      {optionText}
    </button>
  );
}

function ScoreCard({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Studying!';
  const colour = pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--accent)';

  return (
    <div className="quiz-results animate-fade-in-up">
      <div className="score-circle">
        <span className="score-number">{score}/{total}</span>
        <span className="score-label">Score</span>
      </div>
      <h2 style={{ fontSize: '2rem', marginBottom: 8 }}>{grade}</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
        You answered <strong style={{ color: colour }}>{score} out of {total}</strong> questions correctly ({pct}%).
      </p>

      {/* conditional message based on score */}
      {pct >= 80 && (
        <div className="alert alert-success animate-fade-in">
          🌟 Outstanding performance! You have a solid grasp of front-end fundamentals.
        </div>
      )}
      {pct >= 60 && pct < 80 && (
        <div className="alert alert-warning animate-fade-in">
          💪 Good effort! Review the questions you missed and you will get there.
        </div>
      )}
      {pct < 60 && (
        <div className="alert alert-error animate-fade-in">
          📖 Don't give up — revisit the course material and try again!
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
        <button className="btn btn-accent" onClick={onRestart}>Try Again</button>
        <Link href="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);     // index of chosen option
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];
  const isLast = currentQ === QUESTIONS.length - 1;
  const progress = ((currentQ + (answered ? 1 : 0)) / QUESTIONS.length) * 100;

  // EVENT HANDLER: user picks an answer
  function handleSelect(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.answer) {
      setScore(s => s + 1);
    }
  }

  // EVENT HANDLER: advance to next question or finish
  function handleNext() {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function getOptionStatus(idx) {
    if (!answered) return '';
    if (idx === question.answer) {
      return selected === idx ? 'selected-correct' : 'reveal-correct';
    }
    if (idx === selected) return 'selected-wrong';
    return '';
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="quiz-container">
          <div className="page-header animate-fade-in-up">
            <p className="overline">Interactive Quiz</p>
            <h1>Test Your Knowledge</h1>
            <p>Five questions covering HTML, CSS, JavaScript, and React fundamentals.</p>
          </div>

          {/* CONDITIONAL RENDERING: results screen vs quiz screen */}
          {finished ? (
            <ScoreCard score={score} total={QUESTIONS.length} onRestart={handleRestart} />
          ) : (
            <div className="animate-fade-in-up stagger-2">
              {/* Progress */}
              <div className="quiz-progress">
                <span className="quiz-progress-label">Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span className="quiz-progress-label" style={{ color: 'var(--accent)' }}>
                  {score} correct
                </span>
              </div>
              <div className="progress-bar-track" style={{ marginBottom: 0 }}>
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>

              {/* Question Card */}
              <div className="question-card" key={currentQ}>
                <p className="question-number">Question {currentQ + 1}</p>
                <p className="question-text">{question.question}</p>
                <div className="options-grid">
                  {question.options.map((opt, i) => (
                    <OptionButton
                      key={i}
                      optionText={opt}
                      optionKey={KEYS[i]}
                      status={getOptionStatus(i)}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                    />
                  ))}
                </div>

                {/* CONDITIONAL RENDERING: explanation only after answering */}
                {answered && (
                  <div className={`explanation-box ${selected === question.answer ? 'correct' : 'wrong'}`}>
                    <strong>{selected === question.answer ? '✓ Correct! ' : '✗ Incorrect. '}</strong>
                    {question.explanation}
                  </div>
                )}

                <div className="quiz-nav">
                  <div style={{ display: 'flex', gap: 8 }}>
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: i < currentQ ? 'var(--success)' : i === currentQ ? 'var(--accent)' : 'var(--border)',
                          transition: 'background 0.3s',
                        }}
                      />
                    ))}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!answered}
                  >
                    {isLast ? 'Finish Quiz' : 'Next Question'} →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
