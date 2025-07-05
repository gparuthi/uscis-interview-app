import React, { useState, useEffect } from 'react'

function Quiz({ questions, progress, onUpdateProgress, onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showAnswers, setShowAnswers] = useState(false)

  const getUnmasteredQuestions = () => {
    return questions.filter(q => !progress[q.id]?.mastered)
  }

  const getRandomQuestion = () => {
    const unmasteredQuestions = getUnmasteredQuestions()
    if (unmasteredQuestions.length === 0) return null
    
    const wrongAnsweredQuestions = unmasteredQuestions.filter(q => 
      progress[q.id]?.wrong > 0
    )
    
    // 70% chance to show a wrong-answered question if available, 30% chance for any unmastered
    const showWrongQuestion = wrongAnsweredQuestions.length > 0 && Math.random() < 0.7
    
    let availableQuestions
    if (showWrongQuestion) {
      availableQuestions = wrongAnsweredQuestions
    } else {
      availableQuestions = unmasteredQuestions
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    return availableQuestions[randomIndex]
  }

  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(getRandomQuestion())
    }
  }, [questions, progress])

  const handleAnswer = (isCorrect) => {
    if (!currentQuestion) return
    
    onUpdateProgress(currentQuestion.id, isCorrect)
    
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion())
      setShowAnswers(false)
    }, 500)
  }

  const unmasteredCount = getUnmasteredQuestions().length

  if (unmasteredCount === 0) {
    return (
      <div className="completion-message">
        <h2>Congratulations! 🎉</h2>
        <p>You answered all {questions.length} civics questions correctly!</p>
        <p>You're ready for the USCIS citizenship test.</p>
        <button className="reset-btn" onClick={onReset}>
          Start Over
        </button>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="quiz-card">
        <p>Loading question...</p>
      </div>
    )
  }

  const questionProgress = progress[currentQuestion.id] || { correct: 0, wrong: 0 }

  return (
    <div className="quiz-card">
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        Question {currentQuestion.id} | 
        Correct: {questionProgress.correct}/1 | 
        Wrong: {questionProgress.wrong} |
        Status: {questionProgress.mastered ? 'Mastered' : 'Learning'} |
        Remaining: {unmasteredCount}
      </div>
      
      <div className="question">
        <strong>Q{currentQuestion.id}:</strong> {currentQuestion.question}
      </div>

      {!showAnswers ? (
        <div className="quiz-controls">
          <button 
            className="reveal-btn"
            onClick={() => setShowAnswers(true)}
          >
            Show Answer
          </button>
        </div>
      ) : (
        <>
          <div className="answers">
            <strong>Acceptable answers:</strong>
            {currentQuestion.answer.split(';').map((answer, index) => (
              <div key={index} className="answer">
                {answer.trim()}
              </div>
            ))}
          </div>

          <div className="quiz-controls">
            <button 
              className="correct-btn"
              onClick={() => handleAnswer(true)}
            >
              ✓ Got it Right
            </button>
            <button 
              className="wrong-btn"
              onClick={() => handleAnswer(false)}
            >
              ✗ Got it Wrong
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz