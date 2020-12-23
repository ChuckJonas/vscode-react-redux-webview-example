import * as path from 'path';
import * as vscode from 'vscode';
import { sendActionAsync } from './actionMessenger';
import { increment, getActiveEditor } from './actions';
import { MessageHandler } from './messageReciever';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('react-webview.start', () => {
        let activeEditor = vscode.window.activeTextEditor;
        if(activeEditor){
            ReactPanel.createOrShow(context.extensionPath, activeEditor);
        }
	}));
}

/**
 * Manages react webview panels
 */
class ReactPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ReactPanel | undefined;

	public static createOrShow(extensionPath: string, editor: vscode.TextEditor) {
		const column = vscode.ViewColumn.Two;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, editor, column);
        }

        sendActionAsync(() => getActiveEditor(editor), ReactPanel.currentPanel._panel)
        .then(()=>console.log('load successful'))
        .catch((e)=>console.warn('load failed', e));
	}


	private static readonly viewType = 'react';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];
	private constructor(extensionPath: string, packageEditor: vscode.TextEditor, column: vscode.ViewColumn) {
        this._extensionPath = extensionPath;

        let relPath = vscode.workspace.asRelativePath(packageEditor.document.uri);
		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, relPath, column, {
			// Enable javascript in the webview
            enableScripts: true,

			// And restrict the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'build'))
			]
        });


		// Set the webview's initial html content
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        let messageHandler = new MessageHandler(this._panel, packageEditor);
		this._panel.webview.onDidReceiveMessage(messageHandler.handleMessage, null, this._disposables);
	}


	public dispose() {
		ReactPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview() {

		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', 'app.js'));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}