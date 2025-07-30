import React, { useState } from 'react';

export default function Login({ setUsername, setPage }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const text = await res.text();
    alert(text);
    if (res.ok) setUsername(user);
  };

  return (
    <div>
      <h3>Login</h3>
      <input placeholder='Username' value={user} onChange={e => setUser(e.target.value)} /><br />
      <input type='password' placeholder='Password' value={pass} onChange={e => setPass(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
      <p>No account? <button onClick={() => setPage('signup')}>Signup</button></p>
    </div>
  );
}