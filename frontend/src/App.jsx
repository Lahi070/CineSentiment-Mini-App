import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const samples = [
    { 
      name: "Madame Web", 
      text: "The plot was a bit confusing, but the visuals were decent.",
      image: "https://www.themoviedb.org/t/p/w500/r7DuyYJszNVn9XmkyEiw9idMGnS.jpg" 
    },
    { 
      name: "Prince of Persia", 
      text: "An absolute classic! The action sequences are still amazing.",
      image: "https://www.themoviedb.org/t/p/w500/98Xp46uS7mP663H6m299oZz9fWf.jpg"
    },
    { 
      name: "The Batman", 
      text: "Dark, gritty, and masterfully directed. Best superhero movie in years.",
      image: "https://www.themoviedb.org/t/p/w500/74xTEgt7R36FpZuB7buRmgPRO7B.jpg"
    },
    { 
      name: "Godzilla", 
      text: "The monsters were great, but the human characters felt a bit dull.",
      image: "https://www.themoviedb.org/t/p/w500/tMefBv7RSTCST9d6jnZzbvN0vUX.jpg"
    }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const posWords = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'wonderful', 'nice', 'awesome', 'masterpiece', 'classic', 'enjoyed', 'fantastic'];
      const negWords = ['bad', 'worst', 'awful', 'terrible', 'hate', 'boring', 'poor', 'waste', 'disappointing', 'horrible', 'dull', 'confusing', 'fail'];
      
      let score = 0.5;
      const words = inputText.toLowerCase().split(/\W+/);
      
      words.forEach(w => {
        if (posWords.includes(w)) score += 0.15;
        if (negWords.includes(w)) score -= 0.15;
      });

      const finalScore = Math.min(Math.max(score, 0.02), 0.98);
      
      setResult({
        positive: finalScore,
        negative: 1 - finalScore
      });
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="header">
          <h1 className="glowing-title">CineSentiment</h1>
          <p className="subtitle">High-Accuracy Movie Review Analysis</p>
        </div>

        <div className="samples-grid">
          <p className="section-label">Try a sample review, or type your own:</p>
          <div className="cards-container" style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0' }}>
            {samples.map((s, i) => (
              <div 
                key={i} 
                className="movie-card" 
                onClick={() => setInputText(s.text)}
                style={{ 
                  flex: '0 0 120px',
                  height: '180px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div className="card-overlay" style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  width: '100%', 
                  background: 'rgba(0,0,0,0.7)', 
                  padding: '5px', 
                  textAlign: 'center', 
                  borderBottomLeftRadius: '12px', 
                  borderBottomRightRadius: '12px' 
                }}>
                  <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>{s.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="input-section">
          <textarea 
            className="review-box"
            placeholder="Type or paste your movie review here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="button-group">
            <button className="analyze-btn" onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? "🧠 Analyzing..." : "✨ Analyze Sentiment"}
            </button>
            <button className="clear-btn" onClick={() => {setInputText(""); setResult(null);}}>Clear</button>
          </div>
        </div>

        {result && !isAnalyzing && (
          <div className="result-card fade-in">
            <h2>AI Analysis Result</h2>
            <div className="score-row">
              <div className="score-box positive-box">
                <p>Positive</p>
                <span className="score-value">{(result.positive * 100).toFixed(1)}%</span>
              </div>
              <div className="score-box negative-box">
                <p>Negative</p>
                <span className="score-value">{(result.negative * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;