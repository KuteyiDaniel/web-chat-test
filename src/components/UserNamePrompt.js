import React, { useState } from 'react';

const UserNamePrompt = ({ onUserNameSubmit }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() === '') {
      setError('Please enter a valid name');
    } else {
      localStorage.setItem('userName', userName);
      onUserNameSubmit(userName); // Notify the parent component that the name is set
    }
  };

  return (
    <section className="user-name-prompt">
        <div>
            <h2>Enter your name to join the ChatRoom</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={userName}
                onChange={handleChange}
                placeholder="Enter your name"
                />
                <button type="submit">Enter Chat</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    </section>
  );
};

export default UserNamePrompt;
