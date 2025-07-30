import React, { useEffect, useState } from 'react';

function BoardingSequence() {
  const [boardingData, setBoardingData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/bookings/sorted')
      .then(response => response.json())
      .then(data => setBoardingData(data))
      .catch(error => console.error('Error fetching sorted bookings:', error));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Output Boarding Sequence</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Seq</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Booking ID</th>
          </tr>
        </thead>
        <tbody>
  {boardingData.map((entry, index) => (
    <tr key={index}>
      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{index + 1}</td> {/* 👈 This is the sequence number */}
      <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{entry.bookingId}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default BoardingSequence;
