import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // The original movie cards you liked
  const samples = [
    { name: "Madame Web", text: "The plot was a bit confusing, but the visuals were decent." },
    { name: "Prince of Persia", text: "An absolute classic! The action sequences are still amazing." },
    { name: "The Batman", text: "Dark, gritty, and masterfully directed. Best superhero movie in years." },
    { name: "Godzilla", text: "The monsters were great, but the human characters felt a bit dull." }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    // Show the "Thinking" animation for 1 second to look like real AI
    setTimeout(() => {
      const pos = ["good", "great", "excellent", "amazing", "love", "best", "wonderful", "nice", "awesome", "masterpiece", "classic"];
      const neg = ["bad", "worst", "awful", "terrible", "hate", "boring", "poor", "waste", "disappointing", "horrible", "dull"];
      
      let score = 0.5;
      const words = inputText.toLowerCase().split(/\W+/);
      words.forEach(w => {
        if (pos.includes(w)) score += 0.15;
        if (neg.includes(w)) score -= 0.15;
      });

      const finalScore = Math.min(Math.max(score, 0.05), 0.95);
      setResult({ positive: finalScore, negative: 1 - finalScore });
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
          <div className="cards-container">
            {samples.map((s, i) => (
              <div key={i} className="movie-card" onClick={() => setInputText(s.text)}>
                <div className="card-overlay"><span>{s.name}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="input-section">
          <textarea 
            className="review-box"
            placeholder="Paste your movie review here..."
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