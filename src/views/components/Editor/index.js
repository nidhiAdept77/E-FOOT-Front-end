import React, {
    useState,
    useRef
} from 'react'
import JoditEditor from "jodit-react"

const Editor = ({ value, changeHandler, className}) => {
    const editor = useRef(null)
    const config = {
        useSearch: true,
        uploader: {
            insertImageAsBase64URI: true
        },
        toolbarButtonSize: "small",
        defaultMode: "1",
        defaultMode: true,
        toolbarInlineForSelection: true,
        showPlaceholder: false,
        buttons: "source,bold,italic,underline,strikethrough,eraser,ul,ol,indent,outdent,left,font,fontsize,paragraph,brush,image,video"
          
    }
 
    return (<JoditEditor ref = {editor}
        value = {value}
        config = {config}
        tabIndex = {1} // tabIndex of textarea
        onBlur = {newContent => changeHandler(newContent)} // preferred to use only this option to update the content for performance reasons
        />)
}

export default Editor