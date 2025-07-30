import React, { useState, useEffect } from 'react';

export default function Sequence() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/bookings/sequence')
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  return (
    <div>
      <h3>Input Boarding Sequence</h3>
      <table border='1'>
        <thead>
          <tr><th>#</th><th>Booking ID</th><th>Seats</th></tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b.bookingId}>
              <td>{i + 1}</td>
              <td>{b.bookingId}</td>
              <td>{b.seats.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
