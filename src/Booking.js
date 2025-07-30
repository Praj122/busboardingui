import React, { useState } from 'react';

export default function Booking({ username }) {
  const [bookingId, setBookingId] = useState('');
  const [seats, setSeats] = useState('');

  const handleBooking = async () => {
    const res = await fetch('http://localhost:8080/api/bookings/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId: parseInt(bookingId),
        seats: seats.split(',').map(s => s.trim()),
        username: username
      })
    });
    const data = await res.text();
    alert(data);
    setBookingId(''); setSeats('');
  };

  return (
    <div>
      <h3>Booking</h3>
      <input placeholder='Booking ID' value={bookingId} onChange={e => setBookingId(e.target.value)} /><br />
      <input placeholder='Seats (comma-separated)' value={seats} onChange={e => setSeats(e.target.value)} /><br />
      <button onClick={handleBooking}>Add Booking</button>
    </div>
  );
}