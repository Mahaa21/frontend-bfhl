import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };


  const handleSubmit = async () => {
  try {
    const parsedData = JSON.parse(jsonInput);
    const result = await axios.post('http://127.0.0.1:5000/bfhl', { data: parsedData.data });
    setResponse(result.data);
    setError('');
  } catch (err) {
    setError('Invalid JSON or API Error');
    setResponse(null);
  }
};


  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {JSON.stringify(numbers)}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {JSON.stringify(alphabets)}</div>}
        {selectedOptions.includes('Highest Alphabet') && <div>Highest Alphabet: {JSON.stringify(highest_alphabet)}</div>}
      </div>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <textarea value={jsonInput} onChange={handleInputChange} placeholder='Enter JSON here'></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && (
        <div>
          <label>Show: </label>
          <select multiple onChange={handleOptionChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
