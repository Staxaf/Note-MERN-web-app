import React from 'react'
import {Field, reduxForm} from "redux-form";
import {NavLink} from 'react-router-dom'

let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <Field name={"email"} component={"input"} type="email" className="form-control" id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <Field name={"password"} component={"input"} type="password" className="form-control"
                   id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button className="btn btn-primary">Login</button>
    </form>
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

export const Login = (props) => {
    const onSubmit = (values) => {
        props.login(values.email, values.password)
    }
    return <div className={"container"}>
        <LoginForm onSubmit={onSubmit}/>
        {props.message.messagePlace === 'login' && <div className={"login__message text-center"}>
            <p className={props.message.isError ? 'text-danger' : 'text-success'} >{props.message.messageText}</p>
        </div>}
        <div className={"login__links"}>
            <div><NavLink to={"/signup"}><p>Sign up</p></NavLink></div>
        </div>
    </div>
}