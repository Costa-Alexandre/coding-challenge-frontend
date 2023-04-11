import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';
import initializeSheets from './sheets';
import { updateRow } from '../../utils/update';

const SheetsContext = createContext();

function SheetsProvider({ children }) {
  const updateOrdersRow = async (row, content = {}) => {
    const doc = await initializeSheets();
    const sheetTitle = 'Orders';
    await updateRow(doc, sheetTitle, row, content);
  };

  const value = useMemo(
    () => ({
      updateOrdersRow,
    }),
    [],
  );

  return (
    <SheetsContext.Provider value={value}>{children}</SheetsContext.Provider>
  );
}

export default SheetsProvider;
export const useSheets = () => useContext(SheetsContext);
