import config from './config';

test('apiKey is set', () => {
  const apiKey = config.apiKey;
  expect(apiKey).not.toBe(undefined);
});

test('spreadsheetId is set', () => {
  const spreadsheetId = config.spreadsheetId;
  expect(spreadsheetId).not.toBe(undefined);
});
