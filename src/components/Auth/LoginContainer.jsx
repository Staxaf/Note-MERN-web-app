import React from 'react'
import {SignUp} from "./SignUp";
import {Login} from "./Login";
import {connect} from "react-redux";
import {Route} from "react-router";
import {login, signUp} from "../../redux/auth-reducer";


const LoginContainer = props => {
    return <div className={"container"}>
        <Route exact path={'/signup'} render={() => <SignUp isSigningUp={props.isSigningUp} message={props.message} signUp={props.signUp}/>}/>
        <Route exact path={'/login'} render={() => <Login message={props.message} login={props.login} />}/>
    </div>
}

const mapStateToProps = state => ({
    message: state.auth.message,
    isSigningUp: state.auth.isSigningUp
})

export default connect(mapStateToProps, {login, signUp})(LoginContainer)