import React, { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
import Stats from './components/Stats'
import questions from './questions.json'

function App() {
  const [currentView, setCurrentView] = useState('quiz')
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('civics-quiz-progress')
    if (saved) {
      const savedProgress = JSON.parse(saved)
      // Update mastery status for existing progress based on new threshold (1 correct)
      const updatedProgress = {}
      questions.forEach(q => {
        const existing = savedProgress[q.id] || { correct: 0, wrong: 0, mastered: false }
        updatedProgress[q.id] = {
          ...existing,
          mastered: existing.correct >= 1
        }
      })
      return updatedProgress
    }
    
    const initialProgress = {}
    questions.forEach(q => {
      initialProgress[q.id] = { correct: 0, wrong: 0, mastered: false }
    })
    return initialProgress
  })

  useEffect(() => {
    localStorage.setItem('civics-quiz-progress', JSON.stringify(progress))
  }, [progress])

  const updateProgress = (questionId, isCorrect) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      if (isCorrect) {
        newProgress[questionId].correct++
        if (newProgress[questionId].correct >= 1) {
          newProgress[questionId].mastered = true
          console.log(`Question ${questionId} mastered!`)
        }
      } else {
        newProgress[questionId].wrong++
        newProgress[questionId].mastered = false
      }
      console.log(`Question ${questionId}: ${newProgress[questionId].correct} correct, ${newProgress[questionId].wrong} wrong, mastered: ${newProgress[questionId].mastered}`)
      return newProgress
    })
  }

  const resetProgress = () => {
    const initialProgress = {}
    questions.forEach(q => {
      initialProgress[q.id] = { correct: 0, wrong: 0, mastered: false }
    })
    setProgress(initialProgress)
  }

  const getMasteredCount = () => {
    return Object.values(progress).filter(p => p.mastered).length
  }

  return (
    <div className="container">
      <nav className="nav">
        <button 
          className={currentView === 'quiz' ? 'active' : ''}
          onClick={() => setCurrentView('quiz')}
        >
          Quiz
        </button>
        <button 
          className={currentView === 'stats' ? 'active' : ''}
          onClick={() => setCurrentView('stats')}
        >
          Statistics
        </button>
      </nav>

      <div className="progress-info">
        <h2>USCIS Civics Quiz</h2>
        <p>Mastered: {getMasteredCount()} / {questions.length} questions</p>
        <p>Answer correctly once to master a question</p>
      </div>

      {currentView === 'quiz' && (
        <Quiz 
          questions={questions}
          progress={progress}
          onUpdateProgress={updateProgress}
          onReset={resetProgress}
        />
      )}

      {currentView === 'stats' && (
        <Stats 
          questions={questions}
          progress={progress}
          onReset={resetProgress}
        />
      )}
    </div>
  )
}

export default App