import React from 'react'
import {Field, reduxForm} from "redux-form";
import {NavLink} from 'react-router-dom'

let SignUpForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Full name</label>
            <Field name={"name"} component={"input"} type="text" className="form-control"
                   aria-describedby="emailHelp"
                   placeholder="Enter a name"/>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <Field name={"email"} component={"input"} type="email" className="form-control"
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
        <button disabled={props.isSigningUp}   className="btn btn-primary">Sign Up</button>
    </form>
}

SignUpForm = reduxForm({
    form: 'signUp'
})(SignUpForm)

export const SignUp = (props) => {
    const onSubmit = (values) => {
        props.signUp(values.email, values.password, values.name)
    }
    return <div>
        <SignUpForm onSubmit={onSubmit} isSigningUp={props.isSigningUp}/>
        {props.message.messagePlace === 'signUp' && <div className={"login__message text-center"}>
            <p className={props.message.isError ? 'text-danger' : 'text-success'} >{props.message.messageText}</p>
        </div>}
        <div className={"login__links"}>
            <div className={"login__link"}><NavLink to={"/login"}><p>Login</p></NavLink></div>
        </div>
    </div>
}