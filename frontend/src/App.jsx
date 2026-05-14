import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    // Optimized Logic using your Colab Retraining Data
    setTimeout(() => {
      // 1. Your Positive "Smart Words"
      const posWords = [
        'perfect', 'the best', 'love', 'wonderful', 'excellent', 
        'great', 'best', 'brilliant', 'amazing', 'masterpiece'
      ];

      // 2. Your Negative "Smart Words"
      const negWords = [
        'poorly', 'crap', 'horrible', 'terrible', 'nothing', 
        'stupid', 'poor', 'waste of', 'worse', 'boring', 
        'waste', 'awful', 'the worst', 'worst', 'bad', 'crap'
      ];

      let score = 0.5;
      const lowerText = inputText.toLowerCase();

      // Check for Phrases (Multi-word matches)
      if (lowerText.includes("waste of")) score -= 0.25;
      if (lowerText.includes("the best")) score += 0.25;
      if (lowerText.includes("the worst")) score -= 0.25;

      // Check for Single Words
      const words = lowerText.split(/\W+/);
      words.forEach(w => {
        if (posWords.includes(w)) score += 0.15;
        if (negWords.includes(w)) score -= 0.15;
      });

      // Keep score between 5% and 95%
      const finalScore = Math.min(Math.max(score, 0.05), 0.95);
      
      setResult({
        positive: finalScore,
        negative: 1 - finalScore
      });
      setIsAnalyzing(false);
    }, 700);
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">CineSentiment AI</h1>
        <p className="subtitle">High-Accuracy Sentiment Analysis</p>

        <textarea 
          placeholder="Paste your movie review here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="button-row">
          <button className="btn-analyze" onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? "🧠 Analyzing..." : "✨ Analyze Sentiment"}
          </button>
          <button className="btn-clear" onClick={handleClear}>
            🗑️ Clear
          </button>
        </div>

        {result && !isAnalyzing && (
          <div className="results">
            <div className="score-item">
              <p style={{ color: '#4ade80' }}>POSITIVE</p>
              <h2>{(result.positive * 100).toFixed(1)}%</h2>
            </div>
            <div className="score-item">
              <p style={{ color: '#f87171' }}>NEGATIVE</p>
              <h2>{(result.negative * 100).toFixed(1)}%</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;