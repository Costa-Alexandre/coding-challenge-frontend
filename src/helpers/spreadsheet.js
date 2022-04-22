import config from '../config';

export function load(callback) {
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

      callback({ orders });
    } catch (error) {
      callback(false, error.result);
    }
  });
}
