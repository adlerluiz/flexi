import { app, BrowserWindow, ipcMain, Tray, Menu, nativeTheme } from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { get, set } from './providers/settingsProvider';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;
let windowSettings: BrowserWindow | undefined;
let tray: any;

nativeTheme.themeSource = get('THEME');

const appList: any = {};
const appControlList: BrowserWindow[] = [];

function createWindowSettings() {
	windowSettings = new BrowserWindow({
		icon: path.resolve(__dirname, 'icons/icon.png'),
		parent: mainWindow,
		modal: true,
		title: 'Settings',
		width: 400,
		height: 400,
		minimizable: false,
		maximizable: false,
		resizable: false,
		autoHideMenuBar: true,
		useContentSize: true,
		webPreferences: {
			contextIsolation: true,
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
		},
	});

	// windowSettings.show();

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		const controlUrl = `${process.env.APP_URL}/#/settings`;
		windowSettings.loadURL(controlUrl);
	} else {
		// we're on production; no access to devtools pls
		windowSettings.loadFile('index.html', {
			hash: '/settings',
		});
	}

	windowSettings.on('closed', () => {
		windowSettings = undefined;
	});
}

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		icon: path.resolve(__dirname, 'icons/icon.png'),
		title: 'Flexi',
		width: 1300,
		minWidth: 1300,
		height: 700,
		minHeight: 700,
		autoHideMenuBar: true,
		useContentSize: true,
		webPreferences: {
			contextIsolation: true,
			// More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
		},
	});

	mainWindow.loadURL(process.env.APP_URL);

	if (get('IS_MAXIMIZED')) {
		mainWindow.maximize();
	}

	if (get('WINDOW_BOUNDS.X')) {
		mainWindow.setPosition(get('WINDOW_BOUNDS.X'), get('WINDOW_BOUNDS.Y'));
	}

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		// mainWindow.webContents.openDevTools({ mode: 'detach' });
	} else {
		// we're on production; no access to devtools pls
		mainWindow.webContents.on('devtools-opened', () => {
			mainWindow?.webContents.closeDevTools();
		});
	}

	mainWindow.on('close', (e: any) => {
		e.preventDefault();
		mainWindow?.hide();
	});

	mainWindow.on('closed', () => {
		mainWindow = undefined;
	});

	mainWindow.on('maximize', () => {
		set('IS_MAXIMIZED', true);
	});

	mainWindow.on('unmaximize', () => {
		set('IS_MAXIMIZED', false);
	});

	mainWindow.on('resized', () => {
		const newSize: any = mainWindow?.getSize();
		set('WINDOW_BOUNDS.WIDTH', newSize[0]);
		set('WINDOW_BOUNDS.HEIGHT', newSize[1]);
	});

	mainWindow.on('moved', () => {
		const newPos: any = mainWindow?.getPosition();
		set('WINDOW_BOUNDS.X', newPos[0]);
		set('WINDOW_BOUNDS.Y', newPos[1]);
	});

	tray = new Tray(path.resolve(__dirname, 'icons/icon.png'));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Open',
			click: () => {
				mainWindow?.show();
			},
		},
		{ type: 'separator' },
		{
			label: 'Exit',
			click: () => {
				app?.exit();
			},
		},
	]);
	tray.setToolTip('Flexi');
	tray.on('click', () => {
		mainWindow?.show();
	});
	tray.setContextMenu(contextMenu);
}

function createWindowApp(params: any) {
	appList[params.id] = new BrowserWindow({
		icon: path.resolve(__dirname, 'icons/icon.png'),
		width: params.width,
		height: params.height,
		minWidth: params.width,
		minHeight: params.height,
		frame: params.showFrame,
		resizable: params.isResizable,
		maximizable: params.isResizable,
		autoHideMenuBar: true,
		useContentSize: true,
		webPreferences: {
			contextIsolation: true,
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
		},
	});

	appControlList[params.id] = new BrowserWindow({
		parent: appList[params.id],
		width: 40,
		height: 325,
		frame: false,
		resizable: false,
		minimizable: false,
		maximizable: false,
		webPreferences: {
			contextIsolation: true,
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
		},
	});

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		const controlUrl = `${process.env.APP_URL}/#/app-controls?id=${params.id}`;
		appControlList[params.id].loadURL(controlUrl);
	} else {
		// we're on production; no access to devtools pls
		appControlList[params.id].loadFile('index.html', {
			hash: `/app-controls?id=${params.id}`,
		});
	}

	appControlList[params.id].setPosition(
		appList[params.id].getPosition()[0] - 42,
		appList[params.id].getPosition()[1],
	);

	appControlList[params.id].show();

	appList[params.id].loadURL(params.url);

	appList[params.id].webContents.insertCSS(
		`* {
      cursor: url(data:text/html;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAKiSURBVDhPlVS9a5phEL/39TtVI0WjTm3MnKFTMpT+Awrd3NNMipiCLl0KLu0kwQ5ZxGbP1FLEOX9BM5YMSkVrDWis2hjFj/5+j6YoaNAfnPfcvXf33HMfarICFxcX5nq9/lzTNB9Eu67rk+Fw2DUajVW32/0zHA6PppaLWBZQOzs7ezmZTJI474I7wM2gCWgA6uCSa9CHaDT6HfICFgKenp66zGZzHEGOIZqm2uVAwL9gn2B7HovFulPtXMBsNvu03+9ncTwA6dT1ej1ptVqKI4DYbDZxuVxitVr5mRiDvsIvmUgkelQoR9yiDQaDtzgeUgcDqVQqUiqVpNlsqoB3d3fSaDSkWCxKrVYT1JOu9H+NV70BV8kZ+OPxeF6BpSgzWLlcVgFWgReQnE6noFlIXjsIhUKX+Xz+t57JZCxQJGCnanZzcyPIlsdHwQtpO4NlPB4fYTIMuEB/BsUutTRqt9s8roXb21uV6Qz7GDMX8/XNRkMZbAL4Sbc7bTDjgOwsqh3EORPWb1PM+dgNBoOZT+bAktRobIoHH2bL4DqK2YGsujA3X2sDI6M4AnYwp31m+Asyg6qh3SRL2nJ0ZufqaDTq6Fx0CNdUchO2t7eVwTqAr1gslpkkV+jyH53/Gnj2RyjUJO/s7MjW1haPj8LhcKiABBLqmEymXCqVGqtNKRQKtWAwaMTxEJ3S+AxcIvf39/y8AD4TmyU+n49bQtUIuneRSOSSgtIQ+J/LgX0DjRFU/H6/BAIBlTHLwPp6vV7Z29tTuodg4J+x118oEAsdSKfTNtTkGB1L4tZp+1aAzwR7z2AnJyf/h3FpS7HfL5DlEY77ID+cn3DOAAapgq5Qklw8Hv9B5TxWzggXnbuJYGoDOLQoywBPbLObbMDMdA4i/wDVhRnsdKvLOQAAAABJRU5ErkJggg==), auto !important;
    }`,
	);

	/*appList[params.id].webContents.on('dom-ready', () => {
    console.log('dom-ready');
  });*/

	if (params.showDevTools) {
		appList[params.id].webContents.openDevTools({ mode: 'undocked' });
	}

	appControlList[params.id].on('move', () => {
		const position = appControlList[params.id].getPosition();
		appList[params.id]?.setPosition(position[0] + 42, position[1]);
	});
}

ipcMain.on('running-list', () => {
	mainWindow?.webContents.send(
		'window-is-running-response',
		Object.keys(appList),
	);
});

ipcMain.on('window-open', (event, arg) => {
	createWindowApp(arg);
});

ipcMain.on('window-close', (event, id) => {
	if (!appList[id]?.isDestroyed()) {
		appList[id]?.destroy();
		delete appList[id];
	}
});

ipcMain.on('window-actions', (event, id, arg) => {
	if (!appList[id]?.isDestroyed()) {
		switch (arg.name) {
			case 'always-top':
				appList[id]?.setAlwaysOnTop(arg.value);
				break;
			case 'reload':
				appList[id]?.reload();
				break;
			case 'back':
				appList[id]?.webContents.goBack();
				break;
			case 'forward':
				appList[id]?.webContents.goForward();
				break;
			case 'dev-tools':
				appList[id]?.webContents.openDevTools({ mode: 'undocked' });
				break;
			case 'is-resizable':
				appList[id]?.setResizable(arg.value);
				break;
			case 'rotate': {
				const position = appList[id].getSize();

				appList[id]?.setResizable(true);
				appList[id]?.setSize(position[1], position[0]);
				appList[id]?.setResizable(false);
				break;
			}
			case 'focus':
				if (appList[id]?.isFocusable()) appList[id]?.focus();
				break;
			case 'zoom':
				appList[id]?.webContents.setZoomFactor(arg.value);
				break;
			case 'zoom-in':
				appList[id]?.webContents.setZoomFactor(
					appList[id]?.webContents.getZoomFactor() + arg.value,
				);
				break;
			case 'zoom-out':
				appList[id]?.webContents.setZoomFactor(
					appList[id]?.webContents.getZoomFactor() - arg.value,
				);
				break;
			case 'snapshot':
				appList[id]?.capturePage().then((image: any) => {
					const date = new Date();
					const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
					try {
						fs.writeFile(
							`${app.getPath('pictures')}/Flexi_snapshot_${time}.png`,
							image.toPNG(),
							(err) => {
								if (err) throw err;
								mainWindow?.webContents.send(
									'snapshot-saved',
									`${app.getPath('pictures')}/Flexi_snapshot_${time}.png`,
								);
							},
						);
					} catch (e) {}
					// clipboard.writeImage(image);
				});
				break;
			case 'update-device':
				appList[id]?.setResizable(true);
				appList[id]?.setSize(arg.value.width, arg.value.height);
				appList[id]?.setResizable(false);
				break;
			case 'update-size-width':
				appList[id]?.setResizable(true);
				appList[id]?.setSize(arg.value, appList[id].getSize()[1]);
				appList[id]?.setResizable(false);
				break;
			case 'update-size-height':
				appList[id]?.setResizable(true);
				appList[id]?.setSize(appList[id].getSize()[0], arg.value);
				appList[id]?.setResizable(false);
				break;
			case 'update-url':
				appList[id]?.loadURL(arg.value);
				break;
		}
	}
});

ipcMain.on('settings-actions', (event: any, arg: any) => {
	switch (arg.name) {
		case 'open':
			createWindowSettings();
			break;
		case 'toggle-darkmode':
			if (arg.value === true) {
				nativeTheme.themeSource = 'dark';
			} else {
				nativeTheme.themeSource = 'light';
			}
			set('THEME', nativeTheme.themeSource);
			break;
		case 'get-settings':
			windowSettings?.webContents.send('response-settings', {
				THEME: get('THEME'),
			});
			break;
	}
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === undefined) {
		createWindow();
	}
});

app.on('before-quit', () => {
	mainWindow = undefined;
	//if (isMac()) app.exit();
	tray.destroy();
});

app.on('quit', () => {
	mainWindow = undefined;
	tray.destroy();
});
