import config from '../config';
/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: 'Orders!A1:D1000',
      })
      .then(
        (response) => {
          const data = response.result.values;
          callback({
            data,
          });
        },
        (response) => {
          callback(false, response.result.error);
        },
      );
  });
}
