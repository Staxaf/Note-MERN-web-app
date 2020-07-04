import React, {useEffect} from 'react'
import {Notes} from "./Notes";
import {EditNote} from "./EditNote";
import {addNote, deleteNote, getNotes, setNotes, updateNote} from "../../redux/note-reducer";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {NavBar} from "../Navbar/NavBar";
import {logout, updateUser} from "../../redux/auth-reducer";

const NotesContent = (props) => {
    useEffect(() => {
        props.getNotes(props.token)
    }, [])

    return <>
        <div className="col-2">
            <NavBar user={props.user} token={props.token} logout={props.logout} updateUser={props.updateUser}/>
        </div>
        <div className="col-10">
            <div className="notesContent row no-gutters">
                <Notes notes={props.notes} token={props.token} user={props.user} addNote={props.addNote} setNotes={props.setNotes}/>
                {props.notes && props.notes.map(note => <Route path={`/${note._id}`}
                                                               render={() => <EditNote notes={props.notes} note={note}
                                                                                       token={props.token}
                                                                                       updateNote={props.updateNote}
                                                                                       deleteNote={props.deleteNote}/>}/>)}
            </div>
        </div>
    </>
}

const mapStateToProps = (state) => ({
    notes: state.notes.notes,
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps, {getNotes, updateNote, addNote, deleteNote, setNotes, logout, updateUser})(withRouter(NotesContent))

