import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import List from '../components/QueryResults/List';

export default function Query() {
  const [query, setQuery] = useState('SELECT * FROM DendroTestDb.testTable LIMIT 10');
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(query);

    const res = await fetch(
      "/api/query",
      { method: 'POST', body: JSON.stringify({ query }) }
    );

    const { data } = await res.json();
    setHeaders(data.ColumnInfo);
    setRows(data.Rows);
  };

  return (
    <div className="App h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">

        <form onSubmit={handleSubmit}>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Query
              </h1>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 pb-2 flex w-full justify-end">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Submit
              </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <textarea
                rows="12"
                wrap="hard"
                className="border rounded-md w-full px-2 py-1"
                onChange={(e) => setQuery(e.target.value)}
                defaultValue={query}
              ></textarea>
            </div>
          </div>
        </form>

        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Query Results</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <List headers={headers} rows={rows} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
