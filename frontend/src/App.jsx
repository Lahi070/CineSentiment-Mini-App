import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const samples = [
    { name: "Dune", text: "A cinematic masterpiece with incredible visuals.", img: "https://www.themoviedb.org/t/p/w500/d5N0Bqc0vNqyJjrS39vYvSThoas.jpg" },
    { name: "The Batman", text: "Dark, gritty, and masterfully directed.", img: "https://www.themoviedb.org/t/p/w500/74xTEgt7R36FpZuB7buRmgPRO7B.jpg" },
    { name: "Madame Web", text: "The plot was a bit confusing, but the visuals were decent.", img: "https://www.themoviedb.org/t/p/w500/r7DuyYJszNVn9XmkyEiw9idMGnS.jpg" },
    { name: "Godzilla", text: "The monsters were great, but the humans were dull.", img: "https://www.themoviedb.org/t/p/w500/tMefBv7RSTCST9d6jnZzbvN0vUX.jpg" },
    { name: "Prince of Persia", text: "An absolute classic! Action sequences are amazing.", img: "https://www.themoviedb.org/t/p/w500/98Xp46uS7mP663H6m299oZz9fWf.jpg" }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const pos = ['good', 'great', 'excellent', 'amazing', 'love', 'best', 'wonderful', 'masterpiece', 'classic', 'outstanding', 'perfect', 'incredible'];
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

  const styles = {
    wrapper: { minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif', padding: '20px' },
    container: { maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
    scrollRow: { display: 'flex', overflowX: 'auto', gap: '15px', padding: '20px 0', scrollbarWidth: 'none', msOverflowStyle: 'none' },
    card: (img) => ({
      flex: '0 0 140px', height: '200px', borderRadius: '15px',
      backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
      cursor: 'pointer', position: 'relative', border: '2px solid rgba(255,255,255,0.1)',
      transition: 'transform 0.2s'
    }),
    overlay: { position: 'absolute', bottom: 0, width: '100%', background: 'linear-gradient(transparent, black)', padding: '10px 0', borderBottomLeftRadius: '13px', borderBottomRightRadius: '13px', fontSize: '12px' },
    textarea: { width: '100%', height: '120px', borderRadius: '12px', padding: '15px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155', fontSize: '16px', marginBottom: '15px' },
    btn: { padding: '12px 25px', borderRadius: '8px', border: 'none', backgroundColor: '#6366f1', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' },
    result: { marginTop: '25px', padding: '20px', backgroundColor: '#1e293b', borderRadius: '15px', display: 'flex', justifyContent: 'space-around' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CineSentiment</h1>
        <p style={{ color: '#94a3b8' }}>Select a movie or type your own review</p>

        <div style={styles.scrollRow} className="no-scrollbar">
          {samples.map((s, i) => (
            <div key={i} style={styles.card(s.img)} onClick={() => setInputText(s.text)}>
              <div style={styles.overlay}>{s.name}</div>
            </div>
          ))}
        </div>

        <textarea style={styles.textarea} value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="What did you think of the movie?" />

        <div>
          <button style={styles.btn} onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
          </button>
          <button style={{ ...styles.btn, backgroundColor: '#334155' }} onClick={() => { setInputText(""); setResult(null); }}>Clear</button>
        </div>

        {result && !isAnalyzing && (
          <div style={styles.result}>
            <div>
              <p style={{ color: '#4ade80', fontSize: '14px' }}>POSITIVE</p>
              <h2 style={{ fontSize: '32px' }}>{(result.positive * 100).toFixed(1)}%</h2>
            </div>
            <div>
              <p style={{ color: '#f87171', fontSize: '14px' }}>NEGATIVE</p>
              <h2 style={{ fontSize: '32px' }}>{(result.negative * 100).toFixed(1)}%</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;