import { toDecimal } from './format-numbers';
import filterAndSortOrders from './filter-and-sort-orders';

const API_KEY = process.env.NEXT_PUBLIC_SPREADSHEET_API_KEY;
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;

export async function getOrders() {
  const range = 'Orders';

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`,
    );
    const data = await res.json();

    return data.values.slice(1).map((order) => ({
      orderNumber: parseInt(order[0], 10),
      day: parseInt(order[1].slice(0, 2), 10),
      month: parseInt(order[1].slice(3, 5), 10),
      year: parseInt(order[1].slice(6, 10), 10),
      product: order[2],
      orderVolume: toDecimal(order[3]),
    }));
  } catch (err) {
    return [];
  }
}

export async function getTargets() {
  const range = 'Targets';

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`,
    );
    const data = await res.json();
    const { values } = data;
    return values.slice(1).map((target) => ({
      month: target[0],
      target: parseInt(target[1].replace('.', '').replace(',', '.'), 10),
    }));
  } catch (err) {
    return [];
  }
}

export async function refreshData(year, month) {
  const orders = await getOrders();
  const targets = await getTargets();
  const sortedOrders = filterAndSortOrders(orders, year, month);

  const { target } = targets[month - 1];
  return {
    newOrders: sortedOrders,
    newTarget: target,
  };
}
