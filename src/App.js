import { useCallback, useEffect, useState } from 'react';
import { loadData } from './helpers/spreadsheet';
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

  const fetchData = async () => {
    await loadData((result, error) => {
      if (result) {
        setOrders(result[0]);
        setTargets(result[1]);
      } else {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      console.log('orders', orders);
      console.log('targets', targets);
    }
  }, [orders, targets]);

  const refresh = useCallback(() => {
    console.log('refresh');
    fetchData();
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
        <RefreshCounter callback={refresh} />
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
