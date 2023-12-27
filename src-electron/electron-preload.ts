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

  onSettings(eventName: string, callback: any) {
    ipcRenderer.on(eventName, callback);
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const container: any = document.querySelector('html');

  let startY: any;
  let startX: any; 
  let scrollLeft: any;
  let scrollTop: any;
  let isDown: any;

  container.addEventListener('mousedown', (e: any) => mouseIsDown(e));
  container.addEventListener('mouseup', () => mouseUp());
  container.addEventListener('mouseleave', () => mouseLeave());
  container.addEventListener('mousemove', (e: any) => mouseMove(e));

  function mouseIsDown(e: any) {
    isDown = true;
    startY = e.pageY - container.offsetTop;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
  }
  
  function mouseUp() {
    isDown = false;
  }
  function mouseLeave() {
    isDown = false;
  }
  function mouseMove(e: any) {
    if (isDown) {
      e.preventDefault();
      container.scrollTop = 100;
      //Move vertcally
      const y = e.pageY - container.offsetTop;
      const walkY = y - startY;
      container.scrollTop = scrollTop - walkY;

      //Move Horizontally
      const x = e.pageX - container.offsetLeft;
      const walkX = x - startX;
      container.scrollLeft = scrollLeft - walkX;
    }
  }
});
