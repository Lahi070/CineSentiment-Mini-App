import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Expanded Movie Gallery!
  const movieGallery = [
    {
      id: 1,
      title: "Dune: Part Two",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
      sampleReview: "An absolute visual masterpiece! The cinematography was breathtaking and the soundtrack kept me on the edge of my seat. A perfect sci-fi epic."
    },
    {
      id: 2,
      title: "Madame Web",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80",
      sampleReview: "I was really disappointed. The dialogue was incredibly awkward, the plot made no sense, and the special effects looked terrible. A huge letdown."
    },
    {
      id: 3,
      title: "Prince of Persia",
      image: "https://images.unsplash.com/photo-1563844528129-067e06a638e5?auto=format&fit=crop&w=400&q=80",
      sampleReview: "An absolute thrill ride! The parkour action sequences are incredibly well choreographed, and the visual effects for the time-rewinding dagger are stunning."
    },
    {
      id: 4,
      title: "The Batman",
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=400&q=80",
      sampleReview: "A dark, gritty, and incredible detective story. The cinematography is gorgeous and the soundtrack sets a perfectly gloomy mood."
    },
    {
      id: 5,
      title: "Godzilla x Kong",
      image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=400&q=80", 
      sampleReview: "Just a bunch of giant monsters fighting for two hours. It's silly, loud, and doesn't have much of a story, but it's fun to watch."
    }
  ];

  const handleMovieClick = (review) => {
    setInputText(review);
    setResult(null); 
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error connecting to Python:", error);
      alert("Backend is not responding. Is Uvicorn running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        
        <div className="header">
          <h1 className="glowing-title">CineSentiment</h1>
          <p className="subtitle">AI-Powered Movie Review Analysis</p>
        </div>

        {/* The New Continuously Updating Carousel */}
        <div className="gallery-section">
          <p className="section-label">Try a sample review, or type your own:</p>
          <div className="carousel-container">
            <div className="carousel-track">
              {/* We map the movies TWICE to create a seamless infinite loop */}
              {[...movieGallery, ...movieGallery].map((movie, index) => (
                <div 
                  key={`${movie.id}-${index}`} 
                  className="movie-card"
                  onClick={() => handleMovieClick(movie.sampleReview)}
                >
                  <img src={movie.image} alt={movie.title} className="movie-poster" />
                  <div className="movie-overlay">
                    <span className="movie-title">{movie.title}</span>
                    <span className="click-hint">Click to test</span>
                  </div>
                </div>
              ))}
            </div>
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
              onClick={handleAnalyze}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? "✨ Analyzing..." : "✨ Analyze Sentiment"}
            </button>
            
            <button 
              className="clear-btn" 
              onClick={handleClear}
              disabled={isLoading || (!inputText && !result)}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {result && (
          <div className="result-card">
            <h2>Prediction Results</h2>
            <div className="score-row">
              <div className="score-box positive-box">
                <span className="score-label">Positive</span>
                <span className="score-value">{(result.positive_score * 100).toFixed(1)}%</span>
              </div>
              <div className="score-box negative-box">
                <span className="score-label">Negative</span>
                <span className="score-value">{(result.negative_score * 100).toFixed(1)}%</span>
              </div>
            </div>
            <p className="snippet">"{result.text_received}"</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;