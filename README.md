# USCIS Civics Quiz App

A comprehensive study tool for the USCIS citizenship test, featuring all 100 official civics questions with an intelligent learning system that adapts to your progress.

## 🎯 Features

- **Complete Question Bank**: All 100 official USCIS civics questions
- **Smart Learning Algorithm**: Prioritizes questions you've answered incorrectly
- **Progress Tracking**: Tracks your mastery of each question with persistent storage
- **Detailed Statistics**: View your performance across all questions
- **Adaptive Quiz**: Focuses on unmastered questions with 70% bias toward previously missed questions
- **Clean, Modern UI**: Responsive design optimized for both desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uscis-interview-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📚 How It Works

### Quiz Mode
- **Smart Question Selection**: The app intelligently selects questions you haven't mastered yet
- **Weighted Algorithm**: 70% chance to show previously missed questions, 30% chance for any unmastered question
- **One-Shot Mastery**: Answer a question correctly once to mark it as mastered
- **Instant Feedback**: Self-assess your knowledge with "Got it Right" or "Got it Wrong" buttons

### Statistics Mode
- **Comprehensive Tracking**: View detailed statistics for each question
- **Performance Metrics**: See correct/wrong counts and accuracy percentages
- **Progress Overview**: Track overall mastery progress
- **Question Status**: Visual indicators for mastered, in-progress, and not-started questions

### Data Persistence
- **Local Storage**: Your progress is automatically saved to your browser's local storage
- **Resume Anytime**: Pick up where you left off, even after closing the browser
- **Reset Option**: Clear all progress and start fresh when needed

## 🎓 Question Categories

The app includes questions from all official USCIS civics test categories:

- **American Government**
  - Principles of American Democracy
  - System of Government
  - Rights and Responsibilities
- **American History**
  - Colonial Period and Independence
  - 1800s
  - Recent History
- **Integrated Civics**
  - Geography
  - Symbols
  - Holidays

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Vanilla CSS**: Clean, responsive styling without external frameworks
- **Local Storage API**: Client-side data persistence

### Project Structure
```
src/
├── components/
│   ├── Quiz.jsx          # Main quiz interface
│   └── Stats.jsx         # Statistics and progress tracking
├── App.jsx               # Main application component
├── main.jsx              # Application entry point
├── index.css             # Global styles
└── questions.json        # Complete USCIS question database
```

### Key Features Implementation
- **Smart Algorithm**: Weighted random selection favoring missed questions
- **Progress Tracking**: Persistent state management with localStorage
- **Responsive Design**: Mobile-first CSS with clean, accessible interface
- **Performance Optimized**: Efficient React patterns and minimal re-renders

## 📱 Usage Tips

1. **Study Strategy**: Focus on getting each question right at least once
2. **Review Mistakes**: The app will automatically show you questions you've missed more frequently
3. **Check Statistics**: Use the Statistics tab to identify your weak areas
4. **Complete Mastery**: Aim to master all 100 questions before your citizenship test

## 🔧 Customization

### Modifying Questions
Edit `src/questions.json` to update questions, answers, or categories.

### Adjusting Mastery Threshold
In `src/App.jsx`, modify the mastery condition:
```javascript
mastered: existing.correct >= 1  // Change this number
```

### Changing Question Weight
In `src/components/Quiz.jsx`, adjust the bias toward wrong answers:
```javascript
const showWrongQuestion = wrongAnsweredQuestions.length > 0 && Math.random() < 0.7  // Change 0.7
```

## 🎉 Success Criteria

You'll know you're ready for the USCIS test when:
- ✅ All 100 questions show as "Mastered"
- ✅ You can consistently answer questions without looking at the answers
- ✅ You understand the context and reasoning behind each answer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Questions sourced from official USCIS civics test materials
- Built for aspiring U.S. citizens preparing for their citizenship interview

---

**Good luck with your citizenship test!** 🇺🇸 