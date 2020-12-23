
import { Action } from "redux";
import { WebviewPanel } from "vscode";

export const sendActionAsync = async <T extends Action>(func: () => Promise<T>, panel: WebviewPanel) =>{
    const action = await func();
    sendAction(action, panel);
}

export const sendAction = <T extends Action>(action: T, panel: WebviewPanel) => {
    panel.webview.postMessage({
        target: 'redux',
        action
    });
}