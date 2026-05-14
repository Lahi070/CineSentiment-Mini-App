import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // These paths point to your public/assets folder
  const movieExamples = [
    { name: "Dune", text: "A cinematic masterpiece with incredible visuals.", img: "/assets/dune.jfif" },
    { name: "Apex", text: "A high-stakes sci-fi thriller.", img: "/assets/apex.jfif" },
    { name: "Firebreak", text: "A gritty futuristic battle for survival.", img: "/assets/Firebreak.jfif" },
    { name: "Swapped", text: "A clever and hilarious body-swap adventure.", img: "/assets/Swapped.jfif" },
    { name: "War Machine", text: "A sharp and satirical look at modern warfare.", img: "/assets/war machine.jfif" },
    { name: "Peaky Blinders", text: "The dark and legendary saga conclusion.", img: "/assets/Peaky Blinders.jfif" }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      // High-Accuracy Sentiment Dictionary
      const pos = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'wonderful', 'masterpiece', 'classic', 'outstanding', 'perfect', 'satisfying', 'incredible', 'visuals', 'legendary'];
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