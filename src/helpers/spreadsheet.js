import config from '../config';

export function loadOrders(callback) {
  let obj = [];
  window.gapi.client.load('sheets', 'v4', async () => {
    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: 'Orders!A2:D1000',
      });
      const data = response.result.values;
      const orders = data.map((order) => ({
        orderNumber: order[0],
        orderDate: order[1],
        product: order[2],
        orderVolume: order[3],
      }));

      obj.push(orders);
    } catch (error) {
      callback(false, error.result);
    }

    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: 'Targets!A2:B13',
      });
      const data = response.result.values;
      const targets = data.map((target) => ({
        month: target[0],
        target: target[1],
      }));

      obj.push(targets);
    } catch (error) {
      callback(false, error.result);
    }
    callback(obj);
  });
}

const loadData = async (callback) => {
  window.gapi.load('client', async () => {
    await window.gapi.client.init({
      apiKey: config.apiKey,
      discoveryDocs: config.discoveryDocs,
    });
    loadOrders(callback);
  });
};

export { loadData };
