import React from 'react'
import {NavLink} from 'react-router-dom'

export const Note = ({note}) => {
    return <NavLink to={note._id} activeClassName="note__active" className="note">
        <h5 className="note__title">{note.title ? note.title : 'Неизвестно'}</h5>
        <p className="note__content">{
            note.text.replace(/<\/?[^>]+(>|$)/g, "").length !== 0 ? note.text.replace(/<\/?[^>]+(>|$)/g, "").length > 25 ?
                `${note.text.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 25)}...` :
                note.text.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 25) : '(Пусто)'}
        </p> {/* remove all html tags from a string */}
    </NavLink>
}