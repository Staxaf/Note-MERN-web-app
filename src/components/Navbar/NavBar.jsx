import React, {useState} from 'react'
import {Field, reduxForm} from "redux-form";

let AddTagForm = props => {
    return <form className="input-group">
        <Field component={'input'} name={'tagContent'} type="text" className="form-control" placeholder="Recipient's username"
               aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <div className="input-group-append">
            <button onClick={props.handleSubmit(values => props.setIsAddTagOpen(false))} name={"Cancel"} className="btn btn-outline-secondary" >Cancel</button>
            <button onClick={props.handleSubmit(values => props.onSubmit(values))} name={"Add"} className="btn btn-outline-secondary" type={"submit"}>Add</button>
        </div>
    </form>
}

AddTagForm = reduxForm({
    form: 'addTag'
})(AddTagForm)
export const NavBar = (props) => {
    const onSubmit = (values) => {
        props.updateUser(props.user, values.tagContent, props.token)
        setIsAddTagOpen(false)
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAddTagOpen, setIsAddTagOpen] = useState(false)
    return <div className="navBar">
        <div className={"navBar__menuContainer"}>
            <ul className="navBar__menu">
                <li className="navBar__item">My Notes</li>
                <li className="navBar__item">Starred</li>
                <li className="navBar__item">To do list</li>
            </ul>
            <h2 className="navBar__title">Tags</h2>
            <ul className="navBar__tags">
                {props.user.tags.map(tag => <li className={"navBar__tag"}>
                    <div style={{
                        background: tag.color,
                        height: '15px',
                        width: '15px',
                        borderRadius: '50%',
                        marginRight: '10px'
                    }} className={"navBar__circle"} />{tag.tagContent}
                </li>)}
                <li onClick={() => setIsAddTagOpen(true)} className="navBar__tag navBar__add">Add a Tag</li>
                {isAddTagOpen && <AddTagForm onSubmit={onSubmit} setIsAddTagOpen={setIsAddTagOpen}/>}
            </ul>
        </div>
        <div className={"navBar__userContainer"}>
            <div className={"navBar__user"}>
                <div className={"navBar__userImgWrapper"}>
                    <img
                        src="https://images.unsplash.com/photo-1522196772883-393d879eb14d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=891&q=80"
                        alt=""/>
                </div>
                <p className={"navBar__userName"}>{props.user.name}</p></div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`navBar__btn ${isMenuOpen && "rotate"}`}><i className="fas fa-chevron-down"/></button>
        </div>
        {isMenuOpen && <ul className={"navBar__hiddenMenu"}>
            <li onClick={props.logout}>Log out</li>
        </ul>}
    </div>
}