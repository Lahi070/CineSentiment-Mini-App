import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Using DIRECT URLs that work on any browser
  const samples = [
    { name: "Dune", text: "A cinematic masterpiece with incredible visuals.", img: "https://image.tmdb.org/t/p/w500/d5N0Bqc0vNqyJjrS39vYvSThoas.jpg" },
    { name: "The Batman", text: "Dark, gritty, and masterfully directed.", img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36FpZuB7buRmgPRO7B.jpg" },
    { name: "Madame Web", text: "The plot was a bit confusing, but the visuals were decent.", img: "https://image.tmdb.org/t/p/w500/r7DuyYJszNVn9XmkyEiw9idMGnS.jpg" },
    { name: "Godzilla", text: "The monsters were great, but the humans were dull.", img: "https://image.tmdb.org/t/p/w500/tMefBv7RSTCST9d6jnZzbvN0vUX.jpg" }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const pos = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'wonderful', 'masterpiece', 'classic', 'outstanding', 'perfect', 'incredible', 'visuals', 'balanced', 'satisfying'];
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

  // Inline styles to ensure NO CSS CONFLICTS
  const styles = {
    wrapper: { minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', fontFamily: 'Arial, sans-serif' },
    scrollContainer: { display: 'flex', overflowX: 'auto', gap: '15px', padding: '15px 0', marginBottom: '20px' },
    card: (url) => ({
      flex: '0 0 130px', height: '190px', borderRadius: '12px',
      backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center',
      border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative'
    }),
    cardLabel: { position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.8)', padding: '5px 0', fontSize: '11px', textAlign: 'center', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#818cf8' }}>CineSentiment</h1>
        
        <div style={styles.scrollContainer}>
          {samples.map((s, i) => (
            <div key={i} style={styles.card(s.img)} onClick={() => setInputText(s.text)}>
              <div style={styles.cardLabel}>{s.name}</div>
            </div>
          ))}
        </div>

        <textarea 
          style={{ width: '100%', height: '100px', borderRadius: '10px', padding: '10px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155' }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type review..."
        />

        <button 
          style={{ width: '100%', padding: '12px', marginTop: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#6366f1', color: 'white', fontWeight: 'bold' }}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {result && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1e293b', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div><p style={{ color: '#4ade80', margin: 0 }}>Positive</p><h2>{(result.positive * 100).toFixed(1)}%</h2></div>
            <div><p style={{ color: '#f87171', margin: 0 }}>Negative</p><h2>{(result.negative * 100).toFixed(1)}%</h2></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;