import React from 'react'

function Stats({ questions, progress, onReset }) {
  const getTotalAttempts = (questionId) => {
    const p = progress[questionId] || { correct: 0, wrong: 0 }
    return p.correct + p.wrong
  }

  const getAccuracy = (questionId) => {
    const p = progress[questionId] || { correct: 0, wrong: 0 }
    const total = p.correct + p.wrong
    if (total === 0) return 0
    return Math.round((p.correct / total) * 100)
  }

  const sortedQuestions = [...questions].sort((a, b) => {
    const totalA = getTotalAttempts(a.id)
    const totalB = getTotalAttempts(b.id)
    if (totalA === 0 && totalB === 0) return a.id - b.id
    if (totalA === 0) return 1
    if (totalB === 0) return -1
    return totalB - totalA
  })

  const masteredCount = Object.values(progress).filter(p => p.mastered).length
  const totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.correct + p.wrong, 0)
  const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0)
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  return (
    <div>
      <div className="stats-table">
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
          <h3>Overall Statistics</h3>
          <p>Questions Mastered: {masteredCount} / {questions.length}</p>
          <p>Total Attempts: {totalAttempts}</p>
          <p>Overall Accuracy: {overallAccuracy}%</p>
          <button className="reset-btn" onClick={onReset} style={{ marginTop: '10px' }}>
            Reset All Progress
          </button>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Question #</th>
              <th>Question</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Accuracy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedQuestions.map(question => {
              const p = progress[question.id] || { correct: 0, wrong: 0, mastered: false }
              const attempts = p.correct + p.wrong
              const accuracy = getAccuracy(question.id)
              
              return (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td style={{ maxWidth: '400px' }}>
                    {question.question.length > 80 
                      ? question.question.substring(0, 80) + '...' 
                      : question.question}
                  </td>
                  <td style={{ color: '#28a745', fontWeight: 'bold' }}>{p.correct}</td>
                  <td style={{ color: '#dc3545', fontWeight: 'bold' }}>{p.wrong}</td>
                  <td>{attempts > 0 ? `${accuracy}%` : '-'}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      backgroundColor: p.mastered ? '#d4edda' : attempts > 0 ? '#fff3cd' : '#f8f9fa',
                      color: p.mastered ? '#155724' : attempts > 0 ? '#856404' : '#6c757d'
                    }}>
                      {p.mastered ? 'Mastered' : attempts > 0 ? 'In Progress' : 'Not Started'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Stats