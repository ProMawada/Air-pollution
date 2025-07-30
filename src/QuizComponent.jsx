import React, { useState, useEffect } from 'react';
import './QuizComponent.css';

const questions = [
  {
    question: "Do you live near a highway, industrial area, or crowded city center?",
    options: ["Yes", "No"],
    risk: ["high", "low"]
  },
  {
    question: "How often do you notice strong odors, smoke, or exhaust fumes in your area?",
    options: ["Frequently", "Sometimes", "Rarely", "Never"],
    risk: ["high", "moderate", "low", "low"]
  },
  {
    question: "Do you or people around you experience breathing issues or allergies frequently?",
    options: ["Yes, very often", "Sometimes", "Rarely", "Never"],
    risk: ["high", "moderate", "low", "low"]
  },
  {
    question: "Is outdoor dust noticeable on windows, cars, or surfaces in your home?",
    options: ["Yes, daily", "Sometimes", "No"],
    risk: ["high", "moderate", "low"]
  },
  {
    question: "How much greenery (trees, parks) is available near your home?",
    options: ["None", "Very little", "A lot"],
    risk: ["high", "moderate", "low"]
  },
  {
    question: "Do you frequently hear announcements about air quality alerts or smog warnings?",
    options: ["Yes", "Occasionally", "No"],
    risk: ["high", "moderate", "low"]
  },
  {
    question: "How often do you use vehicles (cars, motorbikes) or live in a high-traffic neighborhood?",
    options: ["Daily", "A few times a week", "Rarely"],
    risk: ["high", "moderate", "low"]
  },
  {
    question: "Do you notice visible smoke or emissions from nearby buildings or factories?",
    options: ["Yes, regularly", "Sometimes", "No"],
    risk: ["high", "moderate", "low"]
  }
];

const riskLevels = {
  low: {
    text: "Your environment seems healthy. Keep maintaining clean habits and spread awareness!",
    color: "#4caf50"
  },
  moderate: {
    text: "Your area shows some signs of environmental stress. Stay alert and take small actions to reduce pollution.",
    color: "#ff9800"
  },
  high: {
    text: "There are serious environmental risks around you. Please take precautions and support local eco-initiatives.",
    color: "#f44336"
  }
};

// Weather Component
const WeatherComponent = ({ onBack }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    getLocationWeather();
    const timer = setInterval(() => setTime(), 1000);
    return () => clearInterval(timer);
  }, []);

  const setTime = () => {
    const timeElem = document.getElementById('time');
    if (timeElem) {
      const now = new Date();
      timeElem.innerText = now.toLocaleTimeString();
    }
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        await fetchWeatherByCoords(lat, lon);
      }, () => setError('Please allow location access.'));
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b5f558462160da78810acd0bb997a9fd`);
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch {
      setError('Failed to fetch weather.');
    }
  };

  const fetchWeatherByCity = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5f558462160da78810acd0bb997a9fd`);
      const data = await res.json();
      if (data.cod !== 200) throw new Error('No match found');
      setWeather(data);
      setLoading(false);
    } catch {
      setError('No match found.');
      setLoading(false);
    }
  };

  const convertTemp = (temp) => Math.round(temp - 273.15);

  const getDirection = (deg) => {
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="theme-btn">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button onClick={onBack} className="back-btn" style={{ marginLeft: '10px' }}>
            Back to Quiz
          </button>
        </div>
      </nav>

      <div className="clock"><h3 id="time"></h3></div>

      <form onSubmit={fetchWeatherByCity} className="weather-form">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter a city" />
        <button type="submit">Search</button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      {error && <div className="error-popup">{error}</div>}

      {weather && !loading && (
        <div className="weather-info">
          <h1>{weather.name}, {weather.sys.country}</h1>
          <h2>{convertTemp(weather.main.temp)}°C</h2>
          <p>{weather.weather[0].main}</p>
          <p>Real Feel: {convertTemp(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind: {weather.wind.speed} km/h ({getDirection(weather.wind.deg)})</p>
        </div>
      )}
    </div>
  );
};


function QuizComponent() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showWeather, setShowWeather] = useState(false);

  const handleOptionClick = (riskValue) => {
    const updatedAnswers = [...answers, riskValue];
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setAnswers(updatedAnswers);
    } else {
      setAnswers(updatedAnswers);
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (answers) => {
    const counts = { low: 0, moderate: 0, high: 0 };
    answers.forEach(risk => counts[risk]++);
    const highest = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    setResult(highest);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setShowWeather(false);
  };

  const goToWeather = () => {
    setShowWeather(true);
  };

  const backToQuiz = () => {
    setShowWeather(false);
  };

  if (showWeather) {
    return <WeatherComponent onBack={backToQuiz} />;
  }

  return (
    <div id="Quiz Section">
      <h2 className="section-title">Environmental Risk Assessment</h2>

      {!result ? (
        <div className="question-container">
          <h3 className="question-title">{questions[current].question}</h3>
          <div className="options-container">
            {questions[current].options.map((option, i) => (
              <div
                key={i}
                className="option"
                onClick={() => handleOptionClick(questions[current].risk[i])}
              >
                <input type="radio" name="option" readOnly />
                <span>{option}</span>
              </div>
            ))}
          </div>
          <div className="progress">
            {questions.map((_, i) => (
              <div key={i} className={`dot ${i <= current ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="question-container" style={{ backgroundColor: riskLevels[result].color }}>
          <h3 className="question-title">Your Risk Level: {result.toUpperCase()}</h3>
          <p>{riskLevels[result].text}</p>
          
          <div style={{ marginTop: '20px' }}>
            <button className="submit-button" onClick={goToWeather} style={{ marginRight: '10px' }}>
             Do you want to knew your weather ? 🌤️
            </button>
            <button className="submit-button" onClick={resetQuiz}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizComponent;

