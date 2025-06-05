import { useState } from 'react';
import { useRouter } from 'next/router';

const cuisines = ['Italian', 'Mexican', 'Chinese', 'Indian', 'French']; // and etc.

const SearchForm = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxTime, setMaxTime] = useState('');

  const isEnabled = Boolean(query.trim() || cuisine || maxTime.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (query.trim()) params.query = query.trim();
    if (cuisine) params.cuisine = cuisine;
    if (maxTime.trim()) params.maxReadyTime = maxTime.trim();

    const queryString = new URLSearchParams(params).toString();
    router.push(`/recipes?${queryString}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-24 p-6 bg-white rounded-xl shadow"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search Query</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter dish..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cuisine</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select cuisine</option>
          {cuisines.map((c) => (
            <option key={c.toLowerCase()} value={c.toLowerCase()}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Max Prep Time (min)
        </label>
        <input
          type="number"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          placeholder="Enter time..."
          min="1"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        disabled={!isEnabled}
        className={`w-full py-2 rounded-md font-medium text-white ${
          isEnabled
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </form>
  );
};

export default SearchForm;
