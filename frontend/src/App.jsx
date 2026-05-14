import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Using DIRECT internet links to guarantee they show up
  const movieExamples = [
    { name: "Dune", text: "A cinematic masterpiece with incredible visuals.", img: "https://www.themoviedb.org/t/p/w500/d5N0Bqc0vNqyJjrS39vYvSThoas.jpg" },
    { name: "Apex", text: "A high-stakes sci-fi thriller.", img: "https://www.themoviedb.org/t/p/w500/ch99Y2uCXS799S9S6u8p6Y7S0p9.jpg" },
    { name: "Firebreak", text: "A gritty futuristic battle for survival.", img: "https://m.media-amazon.com/images/M/MV5BMjA5OTY1MjA3OV5BMl5BanBnXkFtZTgwNjAyMTU4MDI@._V1_.jpg" },
    { name: "Swapped", text: "A clever and hilarious body-swap adventure.", img: "https://m.media-amazon.com/images/M/MV5BMjMxOTM1OTM4MV5BMl5BanBnXkFtZTgwNzYxOTU4MDI@._V1_.jpg" },
    { name: "War Machine", text: "A sharp and satirical look at modern warfare.", img: "https://www.themoviedb.org/t/p/w500/9Xp46uS7mP663H6m299oZz9fWf.jpg" },
    { name: "Peaky Blinders", text: "The dark and legendary saga conclusion.", img: "https://www.themoviedb.org/t/p/w500/v9S9S6m6mO8K89G6m6F66u9Y6y.jpg" }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const pos = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'wonderful', 'masterpiece', 'classic', 'outstanding', 'perfect', 'incredible', 'visuals', 'legendary'];
      const neg = ['bad', 'worst', 'awful', 'terrible', 'hate', 'boring', 'poor', 'waste', 'disappointing', 'horrible', 'dull', 'confusing'];
      
      let score = 0.5;
      const words = inputText.toLowerCase().split(/\W+/);
      words.forEach(w => {
        if (pos.includes(w)) score += 0.15;
        if (neg.includes(w)) score -= 0.15;
      });
      const finalScore = Math.min(Math.max(score, 0.05), 0.95);
      setResult({ positive: finalScore, negative: 1 - finalScore });
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">CineSentiment AI</h1>
        <p className="subtitle">Select a movie or type your review below</p>

        <div className="movie-grid">
          {movieExamples.map((movie, index) => (
            <div 
              key={index} 
              className="movie-item" 
              style={{ backgroundImage: `url(${movie.img})` }}
              onClick={() => setInputText(movie.text)}
            >
              <div className="movie-label">{movie.name}</div>
            </div>
          ))}
        </div>

        <textarea 
          placeholder="What did you think of the movie?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="button-row">
          <button className="btn-analyze" onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? "🧠 Analyzing..." : "✨ Analyze Sentiment"}
          </button>
          <button className="btn-clear" onClick={() => {setInputText(""); setResult(null);}}>
            🗑️ Clear
          </button>
        </div>

        {result && !isAnalyzing && (
          <div className="results">
            <div className="score-item">
              <p style={{ color: '#4ade80', margin: '0', fontSize: '12px', fontWeight: 'bold' }}>POSITIVE</p>
              <h2>{(result.positive * 100).toFixed(1)}%</h2>
            </div>
            <div className="score-item">
              <p style={{ color: '#f87171', margin: '0', fontSize: '12px', fontWeight: 'bold' }}>NEGATIVE</p>
              <h2>{(result.negative * 100).toFixed(1)}%</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;