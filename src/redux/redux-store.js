import {applyMiddleware, combineReducers, createStore} from "redux";
import {noteReducer} from "./note-reducer";
import {reducer} from "redux-form";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";


const reducers = combineReducers({
    notes: noteReducer,
    auth: authReducer,
    form: reducer
})

export const store = createStore(reducers, applyMiddleware(thunk))