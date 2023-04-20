export const updateRow = async (doc, sheetTitle, row, content = {}) => {
  const sheet = doc.sheetsByTitle[sheetTitle];
  const { orderNumber, orderDate, product, orderVolume } = content;

  await sheet.loadCells(`A${row}:D${row}`);
  if (orderNumber) sheet.getCell(row - 1, 0).value = orderNumber;
  if (orderDate) sheet.getCell(row - 1, 1).value = orderDate;
  if (product) sheet.getCell(row - 1, 2).value = product;
  if (orderVolume) sheet.getCell(row - 1, 3).value = orderVolume;
  await sheet.saveUpdatedCells();
};

export const updateTargets = () => {};
