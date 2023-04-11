import { GoogleSpreadsheet } from 'google-spreadsheet';
import serviceAccount from '../../serviceAccountKey.json';

// Config variables
const sheetsConfig = {
  SPREADSHEET_ID: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
  CLIENT_EMAIL: serviceAccount.client_email,
  PRIVATE_KEY: serviceAccount.private_key,
};

const initializeSheets = async () => {
  const { SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY } = sheetsConfig;
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
  } catch (e) {
    // TODO: console.error('Error: ', e);
  }
  return doc;
};

export default initializeSheets;
