import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample movie reviews for the cards
  const samples = [
    { name: "Madame Web", text: "The plot was a bit confusing, but the visuals were decent." },
    { name: "Prince of Persia", text: "An absolute classic! The action sequences are still amazing." },
    { name: "The Batman", text: "Dark, gritty, and masterfully directed. Best superhero movie in years." },
    { name: "Godzilla", text: "The monsters were great, but the human characters felt a bit dull." }
  ];

  const analyzeSentiment = (text) => {
    if (!text.trim()) return;
    setIsAnalyzing(true);

    // Artificial delay to show the "Analyzing" animation for 1 second
    setTimeout(() => {
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'wonderful', 'nice', 'awesome', 'masterpiece', 'enjoyed', 'classic'];
      const negativeWords = ['bad', 'worst', 'awful', 'terrible', 'hate', 'boring', 'poor', 'waste', 'disappointing', 'horrible', 'dull', 'confusing'];
      
      let score = 0.5; 
      const words = text.toLowerCase().split(/\W+/);
      
      words.forEach(word => {
        if (positiveWords.includes(word)) score += 0.15;
        if (negativeWords.includes(word)) score -= 0.15;
      });

      const finalScore = Math.min(Math.max(score, 0.02), 0.98);
      
      setResult({
        positive: finalScore,
        negative: 1 - finalScore
      });
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="header">
          <h1 className="glowing-title">CineSentiment</h1>
          <p className="subtitle">AI-Powered Movie Review Analysis</p>
        </div>

        <div className="samples-grid">
          <p className="section-label">Try a sample review, or type your own:</p>
          <div className="cards-container">
            {samples.map((sample, index) => (
              <div key={index} className="movie-card" onClick={() => setInputText(sample.text)}>
                <div className="card-overlay">
                  <span>{sample.name}</span>
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
            <button 
              className="analyze-btn" 
              onClick={() => analyzeSentiment(inputText)}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "✨ Analyzing..." : "✨ Analyze Sentiment"}
            </button>
            <button className="clear-btn" onClick={() => {setInputText(""); setResult(null);}}>
              🗑️ Clear
            </button>
          </div>
        </div>

        {result && !isAnalyzing && (
          <div className="result-card fade-in">
            <h2>Analysis Result</h2>
            <div className="score-row">
              <div className="score-box positive-box">
                <p>Positive</p>
                <span className="score-value">{(result.positive * 100).toFixed(1)}%</span>
                <div className="progress-bar"><div style={{width: `${result.positive * 100}%`}}></div></div>
              </div>
              <div className="score-box negative-box">
                <p>Negative</p>
                <span className="score-value">{(result.negative * 100).toFixed(1)}%</span>
                <div className="progress-bar"><div style={{width: `${result.negative * 100}%`}}></div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;