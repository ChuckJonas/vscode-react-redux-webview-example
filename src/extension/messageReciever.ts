import { sendActionAsync, sendAction } from "./actionMessenger";
import { getActiveEditor } from "./actions";
import * as vscode from 'vscode';

import { Message } from "../shared/messages";

export class MessageHandler {
    private _panel: vscode.WebviewPanel;
    private _editor: vscode.TextEditor;

    constructor(panel: vscode.WebviewPanel, packageEditor: vscode.TextEditor) {
        this._panel = panel;
        this._editor = packageEditor;
    }

    public handleMessage = (message: Message | never) => {
        switch (message.type) {
            case 'INCREMENT_COUNTER':
                // this could really just be dispatched directly!
                sendAction({
                    type: 'Increment'
                }, this._panel);

                break;
            case 'GET_ACTIVE_EDITOR':
                //this action requires the extension, thus is actually a good example of what you might do here
                sendActionAsync(() => getActiveEditor(this._editor), this._panel)
                .then(() => console.log('update user successful'))
                .catch((e) => console.warn('update user failed', e));

                break;
        }
    }
}


