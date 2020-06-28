import React, {useState} from 'react'
import {Note} from "./Note";

export const Notes = props => {
    const [searchText, setSearchText] = useState('')
    return <div className="notes col-3">
        <div className="input-group mb-3">
            <input type="text" className="form-control shadow-none" placeholder="Find a note..."
                   aria-label="Recipient's username" aria-describedby="basic-addon2" value={searchText}
                   onChange={e => {
                       setSearchText(e.target.value)
                   }
                   }/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary shadow-none" type="button"><i className="fas fa-search"/>
                </button>
            </div>
        </div>
        <div className="notes__container">
            <div className="notes__items">
                {props.notes ? props.notes.filter(note => note.title.indexOf(searchText) !== -1).map(note => <Note note={note}/>) : <p>Loading...</p>}
            </div>
            <button className={"notes__add"} onClick={() => {
                props.addNote(props.notes)
            }}>Add a note
            </button>
        </div>
    </div>
}

