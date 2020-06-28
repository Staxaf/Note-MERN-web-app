import React, {useState} from 'react'
import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {useHistory} from "react-router-dom";


export const EditNote = props => {
    const [noteText, setNoteText] = useState(props.note.text)
    const [titleText, setTitleText] = useState(props.note.title)
    const history = useHistory()
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color"
    ]
    const modules = {
        toolbar: {
            container:
                [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote'],

                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

                    [{'header': [1, 2, 3, 4, 5, 6, false]}],

                    [{'color': []}],          // dropdown with defaults from theme

                    ['clean']                                    // remove formatting button

                ],
        },
        clipboard: {
            matchVisual: false,
        }
    }
    return <div className="col">
        <div className="form-group">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Enter a title..." onChange={e => setTitleText(e.target.value)} value={titleText} />
        </div>
        <ReactQuill value={noteText}
                    onChange={e => setNoteText(e)}
                    theme="snow"
                    modules={modules} formats={formats}/>
        <div className={"edit-buttons"}>
            <button className="btn shadow-none" onClick={() => props.updateNote(props.notes, {
                ...props.note,
                text: noteText,
                title: titleText
            })}><i className="fas fa-save" />
            </button>
            <button className={"btn button-star shadow-none"} onClick={() => props.updateNote(props.notes, {
                ...props.note,
                isStarred: !props.note.isStarred
            })}>{props.note.isStarred ? <i className="fas fa-star" /> : <i className="far fa-star" />}</button>
            <button className={"btn"} onClick={() => {
                props.deleteNote(props.notes, props.note._id)
                history.push('/')
            }}><i className="fas fa-trash-alt" /></button>
        </div>
    </div>
}