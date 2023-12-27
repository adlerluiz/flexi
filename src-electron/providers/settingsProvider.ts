import electronStore from 'electron-store';

const store = new electronStore({
	defaults: {
		THEME: 'light',
		IS_MAXIMIZED: false,
		'WINDOW_BOUNDS.WIDTH': 1300,
		'WINDOW_BOUNDS.HEIGHT': 700,
	},
});

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
