const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let url = 'http://localhost:5000/'

app.on('ready   ', () => {
  let window = new BrowserWindow({
    fullscreen:true,
    autoHideMenuBar:true,
  })
  window.loadURL(url)
})