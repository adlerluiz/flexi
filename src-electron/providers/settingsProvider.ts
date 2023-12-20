import electronStore from 'electron-store';

const store = new electronStore();

/**
 * Get setting value
 * @param {string} settingName
 */
export function get(settingName: string): any {
  return store.get(settingName);
}

/**
 * Set setting value
 * @param {string} settingName
 * @param {*} value
 */
export function set(settingName: string, value: any): void {
  store.set(settingName, value);
}

/**
 * Set initial value for setting if it not setted
 * @param {string} settingName
 * @param {*} initialValue
 */
export function setInitialValue(settingName: string, initialValue: any): void {
  if (!store.has(settingName)) set(settingName, initialValue);
}
