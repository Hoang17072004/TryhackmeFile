import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UngVienTable from './components/UngVienTable';

function App() {
  return (
    <div className="App">
      <div className="bg-primary text-white py-3 mb-4">
        <div className="container">
          <h1>🎉 Hệ thống Bầu cử Blockchain</h1>
        </div>
      </div>
      <UngVienTable />
    </div>
  );
}

export default App;
