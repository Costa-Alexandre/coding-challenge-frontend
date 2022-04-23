import { useEffect, useState } from 'react';
import { initClient } from './helpers/spreadsheet';
import './styles/App.css';
import {
  NavBar,
  RefreshCounter,
  Total,
  ProgressBar,
  LeftTable,
  RightTable,
} from './components';
import Background from './components/Background';

function App() {
  const [orders, setOrders] = useState([]);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    window.gapi.load('client', initClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let sum = 5237.27;
  let monthYY = {
    month: 'January',
    year: '2021',
  };
  let progress = 0.52;
  let maxTarget = 120000;
  let currentTarget = 100000;

  const changeMonth = (direction) => {
    if (direction === 'prev') {
      console.log('prev');
    } else if (direction === 'next') {
      console.log('next');
    }
  };

  return (
    <>
      <Background />
      <div className="App">
        <NavBar
          month={monthYY.month}
          year={monthYY.year}
          callback={(direction) => changeMonth(direction)}
        />
        <RefreshCounter />
        <Total sum={sum} />
        <ProgressBar
          progress={progress}
          maxTarget={maxTarget}
          currentTarget={currentTarget}
        />
        <div className="tables-container">
          <LeftTable />
          <RightTable />
        </div>
      </div>
    </>
  );
}

export default App;
