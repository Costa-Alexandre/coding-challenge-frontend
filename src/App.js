import { useEffect, useState } from 'react';
import './App.css';
import config from './config';
import { load } from './helpers/spreadsheet';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.gapi.load('client', initClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoad = (data, error) => {
    setData(data ? data : error);
  };

  const initClient = async () => {
    await window.gapi.client.init({
      apiKey: config.apiKey,
      discoveryDocs: config.discoveryDocs,
    });
    load(onLoad);
  };

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <p>{JSON.stringify(data)}</p>
      </header>
    </div>
  );
}

export default App;
