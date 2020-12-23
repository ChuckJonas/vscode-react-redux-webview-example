
import { ErrorAction, GetActiveEditor } from "../shared/actions";
import { TextEditor } from "vscode";


export const getActiveEditor = async (editor: TextEditor): Promise<GetActiveEditor | ErrorAction> => {
    try{
        //do async stuff if needed
        return {
            type: 'GetActiveEditor',
            name: editor.document.fileName
        }
    }catch(e){
        console.log(e);
        return {
            type: 'Error',
            msg: e
        };
    }
}