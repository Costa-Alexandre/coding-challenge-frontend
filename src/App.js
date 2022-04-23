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
import {
  getOrdersMonth,
  topOrdersArray,
  getTopRecentOrders,
} from './helpers/filterFunc';
import { createOrdersInterval } from './helpers/timeRange';

function App() {
  const [orders, setOrders] = useState([]);
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(100000);
  const [maxTarget, setMaxTarget] = useState(120000);
  const [currentMonth, setCurrentMonth] = useState(new Date(2000, 0, 1));
  const [intervalArray, setIntervalArray] = useState([new Date(2000, 0, 1)]);
  const [sumOrders, setSumOrders] = useState(0);
  const [progress, setProgress] = useState(0);
  const [topRecentOrders, setTopRecentOrders] = useState([]);
  const [topOrders, setTopOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const refresh = useCallback(() => {
    console.log('refresh');
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      setIntervalArray(createOrdersInterval(orders));
      console.log('interval', intervalArray);
      currentMonth < intervalArray[0] ||
      currentMonth > intervalArray[intervalArray.length - 1]
        ? setCurrentMonth(intervalArray[0])
        : setCurrentMonth(currentMonth);
      setSumOrders(
        getOrdersMonth(
          orders,
          currentMonth.getMonth() + 1,
          currentMonth.getFullYear(),
        ),
        setTopRecentOrders(
          getTopRecentOrders(
            orders,
            currentMonth.getMonth() + 1,
            currentMonth.getFullYear(),
          ),
        ),
        setTopOrders(
          topOrdersArray(
            orders,
            currentMonth.getMonth() + 1,
            currentMonth.getFullYear(),
          ),
        ),
      );
    }
  }, [orders, currentMonth]);

  useEffect(() => {
    if (targets.length > 0) {
      const t = targets.find(
        (target) => target.month === currentMonth.getMonth() + 1,
      );
      setCurrentTarget(t.target);
      setMaxTarget(Math.max(...targets.map((target) => target.target)));
      // console.log(currentTarget, maxTarget);
    }
  }, [targets, currentMonth]);

  useEffect(() => {
    if (currentTarget > 0) {
      setProgress(sumOrders / currentTarget);
    }
  }, [currentTarget, sumOrders]);

  const changeMonth = (direction) => {
    let month = currentMonth.getMonth();
    console.log(month);
    if (direction === 'prev') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), month - 1, 1));
    } else if (direction === 'next') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), month + 1, 1));
    }
  };

  return (
    <>
      <Background />
      <div className="App">
        <NavBar
          currentMonth={currentMonth}
          callback={(direction) => changeMonth(direction)}
          intervalArray={intervalArray}
        />
        <RefreshCounter callback={refresh} />
        <Total sum={sumOrders} />
        <ProgressBar
          progress={progress}
          maxTarget={maxTarget}
          currentTarget={currentTarget}
        />
        <div className="tables-container">
          <LeftTable orders={topRecentOrders} />
          <RightTable orders={topOrders} sumOrders={sumOrders} />
        </div>
      </div>
    </>
  );
}

export default App;
