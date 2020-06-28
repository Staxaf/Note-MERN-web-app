import React, {useEffect} from 'react'
import {Notes} from "./Notes";
import {EditNote} from "./EditNote";
import {addNote, deleteNote, getNotes, setNotes, updateNote} from "../../redux/note-reducer";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";

const NotesContent = (props) => {
    useEffect(() => {
        props.getNotes()
    }, [])

    return <div className="notesContent row no-gutters">
        <Notes notes={props.notes} addNote={props.addNote} setNotes={props.setNotes} />
        {props.notes && props.notes.map(note => <Route path={`/${note._id}`}
                                                       render={() => <EditNote notes={props.notes} note={note}
                                                                               updateNote={props.updateNote} deleteNote={props.deleteNote}/>}/>)}
    </div>
}

const mapStateToProps = (state) => ({
    notes: state.notes.notes
})

export default connect(mapStateToProps, {getNotes, updateNote, addNote, deleteNote, setNotes})(withRouter(NotesContent))

