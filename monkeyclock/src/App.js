import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Clock from 'react-clock';
import './ClockCustom.css';
import './App.css';

function App() {
  const [value, setValue] = useState(new Date());
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageType, setMessageType] = useState('');  // success, error, warning, info
  const [messageKey, setMessageKey] = useState(0);  // Key to re-render the message

  const minutesInputRef = useRef(null);
  const hoursInputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      console.log(`Time entered: ${hours || '00'}:${minutes || '00'}`);
    }
  };


  const handleHoursChange = (e) => {
    let value = e.target.value;
    // Ensure only numbers are entered
    value = value.replace(/\D/g, ''); // Remove any non-numeric characters

    // Keep only the last 2 digits in the input
    if (value.length > 2) {
      value = value.slice(-2); // Always keep the last 2 digits
    }

    setHours(value); // Update the state with the final value
  }
  const handleMinutesChange = (e) => {
    let value = e.target.value;
    // Ensure only numbers are entered
    value = value.replace(/\D/g, ''); // Remove any non-numeric characters

    // Keep only the last 2 digits in the input
    if (value.length > 2) {
      value = value.slice(-2); // Always keep the last 2 digits
    }

    setMinutes(value); // Update the state with the final value
    console.log("input time: ", hours, ":", minutes);
  };

  const handleKeyPress = (e, currentInput) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent default Tab behavior
      if (currentInput === 'hours') {
        minutesInputRef.current.focus(); // Move focus to minutes
      } else if (currentInput === 'minutes') {
        hoursInputRef.current.focus(); // Move focus back to hours
      }
    } else if (e.key === 'Enter') {
      console.log(`Time entered: ${hours || '00'}:${minutes || '00'}`);
      if(validateTime()) {
        console.log("Time is valid");
        setFeedbackMessage("Time is valid!");
        setMessageType('success');
      }
      else {
        console.log("Time is invalid");
        setFeedbackMessage("Time is invalid :(");
        setMessageType('error');
      }

      setMessageKey((prevKey) => prevKey + 1);  // Update the key to re-render the message
    }
  };

  const validateTime = () => {
    const hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);
    
    // Check if the input is a valid time
    if (hoursNum >= 0 && hoursNum <= 23 && minutesNum >= 0 && minutesNum <= 59) {
      return true;  // Valid time
    } else {
      return false;  // Invalid time
    }
  };

  return (
    <div className="App">
      <h1>Welcome to MonkeyClock!</h1>
      <p>Clock game goes brrr</p>

      <div className="main-div">
        <h2>Might screw around and put the clock game in here</h2>
        <Clock
          value={value}
          size={600}
          hourHandLength={50}
          hourHandOppositeLength={10}
          hourHandWidth={4}
          hourMarksLength={10}
          hourMarksWidth={6}
          minuteHandLength={70}
          minuteHandOppositeLength={10}
          minuteHandWidth={2}
          minuteMarksLength={6}
          minuteMarksWidth={1}
          renderHourMarks={true}
          renderMinuteHand={true}
          renderMinuteMarks={true}
          renderNumbers={true}
          renderSecondHand={true}
          secondHandLength={90}
          secondHandOppositeLength={10}
          secondHandWidth={1}
          useMillisecondPrecision={false}
        />

<div className="time-input-wrapper">
        {/* Hours Input */}
        <input
          type="text"
          className="time-input"
          value={hours}
          onChange={handleHoursChange}
          placeholder="HH"
          // maxLength={2}
          onKeyDown={(e) => handleKeyPress(e, 'hours')}  // Listen for TAB key
          ref={hoursInputRef}
          // tabindex="1"
          />

        <span className="colon">:</span> {/* Colon in between inputs */}

        {/* Minutes Input */}
        <input
          type="text"
          className="time-input"
          value={minutes}
          onChange={handleMinutesChange}
          placeholder="MM"
          // maxLength={2}  // Restrict to 2 digits
          onKeyDown={(e) => handleKeyPress(e, 'minutes')}  // Listen for TAB key
          ref={minutesInputRef}
          tabindex="2"
        />
      </div>

      {feedbackMessage && (
      <div key={messageKey} className={`feedback-message ${messageType}`}>
        {feedbackMessage}
      </div>
       )}
      </div>

      
    </div>
  );
}

export default App;
