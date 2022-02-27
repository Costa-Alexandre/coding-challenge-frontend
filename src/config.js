const { REACT_APP_API_KEY, REACT_APP_SPREADSHEET_ID } = process.env;

const config = {
  apiKey: REACT_APP_API_KEY,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  spreadsheetId: REACT_APP_SPREADSHEET_ID,
};

export default config;
