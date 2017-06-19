const electron = require('electron');

let mainWindow;

electron.app.on('ready',()=>{
  mainWindow = new electron.BrowserWindow({width:1280,height:720, });
  mainWindow.loadURL('file:///'+__dirname+'/app/index.html');
});
electron.app.on('window-all-closed',()=>{electron.app.quit();});
