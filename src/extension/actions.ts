
import { ErrorAction, IncrementCounter, GetActiveEditor } from "../shared/actions";
import { TextEditor } from "vscode";

export const increment = async (): Promise<IncrementCounter | ErrorAction> => {
    try{
        //do async stuff if needed
        return {
            type: 'Increment'
        }
    }catch(e){
        console.log(e);
        return {
            type: 'Error',
            msg: e
        };
    }
}


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