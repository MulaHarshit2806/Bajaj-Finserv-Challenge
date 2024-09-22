import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('https://localhost:2000/bfhl', {
        data: parsedData.data,
        file_b64: parsedData.file_b64 || null,
      });
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or request failed!');
      console.error(error);
    }
  };

  const handleFilterChange = selectedOptions => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.map(option => {
      if (response[option.value]) {
        return <p key={option.value}><strong>{option.label}:</strong> {JSON.stringify(response[option.value])}</p>;
      }
      return null;
    });

    return (
      <div className="mt-5">
        {filteredResponse}
      </div>
    );
  };

  return (
    <div className="font-sans p-5 max-w-xl mx-auto">
      <h1 className="text-blue-500 mb-5 text-2xl">
        {response ? response.roll_number : 'Bajaj Finserv Health Dev Challenge'}
      </h1>

      <label className="font-bold mb-2 block">API Input:</label>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder="Enter JSON data"
        rows="5"
        className="w-full p-2 text-base mb-3 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg mb-5"
      >
        Submit
      </button>
      <br />

      <label className="font-bold mb-2 block">Filter Response:</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleFilterChange}
        classNamePrefix="select"
      />

      {renderResponse()}
    </div>
  );
};

export default App;
