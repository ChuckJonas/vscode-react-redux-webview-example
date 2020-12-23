import { Message } from "../shared/messages";

declare function acquireVsCodeApi(): any;
const vscode = acquireVsCodeApi();

export const postMessage = (action: Message) => {
    vscode.postMessage(action);
}
