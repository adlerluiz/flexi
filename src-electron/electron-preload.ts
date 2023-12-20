const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  mainWindow: (id: string) => ipcRenderer.send('dark-mode:system', id),

  settingsActions: (id: string, params: any) =>
    ipcRenderer.send('settings-actions', id, params),

  windowOpen: (params: any) => ipcRenderer.send('window-open', params),

  windowClose: (id: string) => ipcRenderer.send('window-close', id),

  windowActions: (id: string, params: any) =>
    ipcRenderer.send('window-actions', id, params),

  runningList: () => ipcRenderer.send('running-list'),

  on(eventName: string, callback: any) {
    ipcRenderer.on(eventName, callback);
  },
});
