import React from 'react'

export const NavBar = () => {
    return <div className="navBar">
        <ul className="navBar__menu">
            <li className="navBar__item">My Notes</li>
            <li className="navBar__item">Starred</li>
            <li className="navBar__item">To do list</li>
        </ul>
        <h2 className="navBar__title">Tags</h2>
        <ul className="navBar__tags">
            <li className="navBar__tag">Study</li>
            <li className="navBar__tag">Work</li>
            <li className="navBar__tag navBar__add">Add a Tag</li>
        </ul>
    </div>
}