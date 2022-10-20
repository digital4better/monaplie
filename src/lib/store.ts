export const setStoredItem = (item: string, value: any) =>
  localStorage.setItem(item, JSON.stringify(value));
export const getStoredItem = (item: string) => localStorage.getItem(item);
