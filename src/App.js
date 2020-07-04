import React, {useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './index.scss'
import NotesContent from "./components/NotesContent/NotesContent";
import {Route} from "react-router-dom"
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import LoginContainer from "./components/Auth/LoginContainer";
import {getUserWithToken, setToken} from "./redux/auth-reducer";
import Loader from 'react-loader-spinner'

const App = (props) => {
    const history = useHistory()
    useEffect(() => {
        props.getUserWithToken(localStorage.getItem('token'))
    }, [])
    useEffect(() => {
        if (!props.user) {
            history.push('/login')
        } else {
            history.push('/')
        }
    }, [props.user])

    return (

        <div className="appWrapper">
            <div className="row no-gutters">
                {props.isUserLoaded ? props.user ? <Route exact path={'/:userId?'} render={() => <NotesContent/>}/> :
                    <LoginContainer/> : <div className={"text-center"}>
                    <Loader
                        type="Puff"
                        color="#00bb93"
                        height={50}
                        width={50}
                    />
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isUserLoaded: state.auth.isUserLoaded
})

export default connect(mapStateToProps, {setToken, getUserWithToken})(App);
