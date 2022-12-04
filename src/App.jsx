import { useState, useEffect } from "react";

const comingYear = new Date().getFullYear() + 1;
const comingDate = new Date(`Jan 1, ${comingYear} 00:00:00`);

const timeDifference = () => {
  const now = new Date();
  const timeRemaning = comingDate.getTime() - now.getTime();

  const days = Math.floor(timeRemaning / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (timeRemaning % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((timeRemaning % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.ceil((timeRemaning % (60 * 1000)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

function App() {
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaning = timeDifference();

      setTime(timeRemaning);
      setLoading(false);

      if (timeRemaning.seconds < 0) setIsNewYear(true);
    }, 1000);

    return () => clearInterval(interval);
  });

  if (loading) return (
    <div id="preloader">
      <div id="loader"></div>
    </div>
  );

  if (isNewYear) return (
    <div class="sign">
      <span class="fast-flicker">Happy</span>-New<span class="flicker">-YEAR !</span>
    </div>
  );

  return (
    <div class="container">
      <h1>Countdown to New Year 2023</h1>

      <div className="cd_timer">
        <div className="cd_container">
          <div className="time days">{time.days}</div>
          <span className="time text">Days</span>
        </div>

        <div className="cd_container">
          <div className="time hours">{time.hours}</div>
          <span className="time text">Hours</span>
        </div>

        <div className="cd_container">
          <div className="time minutes">{time.minutes}</div>
          <span className="time text">Minutes</span>
        </div>

        <div className="cd_container">
          <div className="time seconds">{time.seconds}</div>
          <span className="time text">Seconds</span>
        </div>
      </div>
    </div>
  );
}

export default App;
