import React, { useState } from 'react';

export default function Signup({ setPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const res = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const text = await res.text();
    alert(text);
    if (res.ok) setPage('login');
  };

  return (
    <div>
      <h3>Signup</h3>
      <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <button onClick={() => setPage('login')}>Login</button></p>
    </div>
  );
}