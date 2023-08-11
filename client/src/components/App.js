import React, { useEffect, useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import { movies, slots, seats } from "./data.js";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [seatData, setSeatData] = useState({});
  const [getdata, setGetdata] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedSeatIndex, setSelectedSeatIndex] = useState(null);

  const handleMovie = (data, index) => {
    setSelectedMovie(data);
    setSelectedMovieIndex(index);
  }

  const handleSlot = (data, index) => {
    setSelectedSlot(data);
    setSelectedSlotIndex(index);
  }

  const handleSeatChange = (seatType, value, index) => {
    setSeatData((prevSeatData) => ({
      ...prevSeatData,
      [seatType]: value,
    }));
    setSelectedSeatIndex(index);
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8080/insertData', {
      method: 'POST',
      body: JSON.stringify({ selectedMovie, selectedSlot, seatData }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json();
    window.location.reload();
    // const delayMilliseconds = Math.floor(Math.random() * 5000) + 5000; // Random delay between 5 to 10 seconds
    // setTimeout(() => {
    //   window.location.reload();
    // }, delayMilliseconds);
  }

  const handleRecord = async () => {
    try {
      const response = await fetch('http://localhost:8080/getData', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGetdata(prevData => [data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleRecord();
    };
    fetchData();
  }, []);

  return (<>
    <h4>Book that show !!</h4>
    <div className="movie-row"><strong>Select A Movie</strong><br></br>
      {movies.map((data, index) =>
        <button
          key={index}
          className={`movie-column ${selectedMovieIndex === index ? "movie-column-selected" : ""}`}
          onClick={() => handleMovie(data, index)}
        >
          {data}
        </button>
      )}
    </div>
    <div className="slot-row"><strong>Select a Time slot</strong> <br></br>
      {slots.map((data, index) =>
        <button className={`slot-column ${selectedSlotIndex === index ? "slot-column-selected" : ""}`} onClick={() => handleSlot(data, index)}>{data}</button>
      )}

    </div>
    <div className="seat-row"><strong>Select the seats </strong><br></br>
      {seats.map((data, index) =>
        <button className={`seat-column ${selectedSeatIndex === index ? "seat-column-selected" : ""}`}><strong>Type {data}</strong><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <input type="number" className={`seat-${data}`} onChange={(e) => handleSeatChange(data, e.target.value, index)}></input>
        </button>
      )}
    </div>
    <button className="booking-data" onClick={handleSubmit}>Book Now</button>
    <div className="last-order">
     <strong>Last Booking Details :</strong> <br></br>
      <div>
        {getdata.map((key) => (
          <p><strong>seats:</strong><br></br>
          <strong>A1</strong>: {key.seats.A1>0 ? (key.seats.A1):(0)}<br></br>
          <strong>A2</strong>: {key.seats.A2>0 ? (key.seats.A2):(0)}<br></br>
          <strong>A3</strong>: {key.seats.A3>0 ? (key.seats.A3):(0)}<br></br>
          <strong>A4</strong>: {key.seats.A4>0 ? (key.seats.A4):(0)}<br></br>
          <strong>D1</strong>: {key.seats.D1>0 ? (key.seats.D1):(0)}<br></br>
          <strong>D2</strong>: {key.seats.D2>0 ? (key.seats.D2):(0)}<br></br> 
          <strong>slot</strong>: {key.slot}<br></br>  
          <strong>movie</strong>: {key.movie}<br></br>  
          
          </p>          
        ))}
      </div>
    </div>
  </>);
}
export default App;
