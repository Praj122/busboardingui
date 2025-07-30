import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Booking from './Booking';
import Sequence from './Sequence';
import BoardingSequence from './BoardingSequence';

function App() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState('login');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🚌 Bus Boarding Sequence Generator</h2>

      {username && <p>Welcome, <b>{username}</b>!</p>}

      {!username && page === 'login' && <Login setUsername={setUsername} setPage={setPage} />}
      {!username && page === 'signup' && <Signup setPage={setPage} />}

      {username && <>
        <Booking username={username} />
        <hr />
        <Sequence />
        <BoardingSequence></BoardingSequence>
      </>}
    </div>
  );
}

export default App;
