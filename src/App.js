import { useEffect, useState } from 'react';
import './App.css';
import config from './config';
import { loadOrders, loadTargets } from './helpers/spreadsheet';

function App() {
  const [orders, setOrders] = useState([]);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    window.gapi.load('client', initClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initClient = async () => {
    await window.gapi.client.init({
      apiKey: config.apiKey,
      discoveryDocs: config.discoveryDocs,
    });
    loadOrders((data, error) => {
      setOrders(data || error);
    });
    loadTargets((data, error) => {
      setTargets(data || error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{JSON.stringify(orders)}</p>
        <p>{JSON.stringify(targets)}</p>
      </header>
    </div>
  );
}

export default App;
