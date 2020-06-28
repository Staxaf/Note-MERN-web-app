import {applyMiddleware, combineReducers, createStore} from "redux";
import {noteReducer} from "./note-reducer";
import {reducer} from "redux-form";
import thunk from "redux-thunk";


const reducers = combineReducers({
    notes: noteReducer,
    form: reducer
})

export const store = createStore(reducers, applyMiddleware(thunk))