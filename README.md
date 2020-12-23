# VSCode Redux-React example

## Message Life-cycle

This sample shows who react-redux can be used in a webview.  The extension sort of becomes the "backend" of the application in a sense.  Communication is done via vscodes `postMessage` api.

- On action, the web-view "posts" a message (see `react-app/messenger.ts`)
- The Extension listens to messages (see `extension/messageReciever.ts`; it's registered in `extension/extension.ts`).  When it receives a message, it can call into the vscode API (or other node processes) and then replies to the webview with a new message in the following format:

```js
{
    target: 'redux',
    action: {} //redux action
}
```

- this message is received by the webview message listener (see `react-app/index.ts` and the `action` is dispatched to redux
- redux updates store
- app receives updates via redux provider

## Running Demo

- `git clone`
- `npm install`
- `npm run build`
- `npm run start-react-dev`
- launch debugger
- open any file (this extension must have an active editor to run)
- `cmd-p -> React: Start React Webview`