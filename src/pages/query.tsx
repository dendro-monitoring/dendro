import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import List from '../components/QueryTable/Table';
import fileDownload from 'js-file-download';

export default function Query() {
  const [query, setQuery] = useState('SELECT * FROM DendroTimestreamDB.hostMetrics LIMIT 10');
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [rawData, setRawData] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(query);

    const res = await fetch(
      '/api/query',
      { method: 'POST', body: JSON.stringify({ query }) }
    );

    const { data } = await res.json();
    setHeaders(data.ColumnInfo);
    setRows(data.Rows ? data.Rows : []);
    setRawData(JSON.stringify(data, null, 2));
  };

  const handleExport = async () => {
    const blob = new Blob([rawData], { type : 'application/json' });
    fileDownload(blob, 'export.json');
  };

  return (
    <>
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
              rows={12}
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

        <div className="px-4 sm:px-6 lg:px-8 pb-2 flex w-full justify-end">
          <button
            className="inline-flex justify-right py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            onClick={handleExport}
          >
            Export
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="pb-4">
            <List headers={headers} rows={rows} />
          </div>
        </div>
      </div>
    </>
  );
}
