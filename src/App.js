import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config';
import { load } from './helpers/spreadsheet';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 1. Load the JavaScript client library.
    window.gapi.load('client:auth2', initClient);
  }, []);

  const onLoad = (data, error) => {
    if (data) {
      setData(data);
    } else {
      setData(error);
    }
  };

  const initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs,
      })
      .then(() => {
        // 3. Initialize and make the API request.
        load(onLoad);
      });
  };

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
