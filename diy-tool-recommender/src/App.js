import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [tools, setTools] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/.netlify/functions/ai-helper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input })
    });

    const data = await response.json();
    setTools(data.tools);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">DIY Tool Recommender</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Describe your DIY task..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Get Tools</button>
      </form>
      {tools && <div className="mt-4 p-4 bg-gray-100">{tools}</div>}
    </div>
  );
}

export default App;
