export default class StoreService {
  /**
   * Get setting value
   * @param {string} key
   */
  get(key: string): any {
    const string = localStorage.getItem(key);
    return string ? JSON.parse(string) : null;
  }

  /**
   * Set setting value
   * @param {string} key
   * @param {*} value
   */
  set(key: string, value: any): void {
    const parsed = JSON.stringify(value);
    localStorage.setItem(key, parsed);
  }
}
