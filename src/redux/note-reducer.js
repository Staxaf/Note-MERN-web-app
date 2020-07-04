import {API_URL, SET_NOTES} from "./types";
import axios from 'axios'

const initialState = {
    notes: []
}

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTES:
            return {
                ...state,
                notes: action.notes
            }
        default:
            return state
    }
}

// Action creators
export const setNotes = (notes) => ({type: SET_NOTES, notes})

// Redux thunks
export const getNotes = (token) => async (dispatch) => {
    const res = await axios.get(`${API_URL}/notes`, {
        headers: {
            Authorization: token // token of authorized user
        }
    })
    dispatch(setNotes(res.data))
}

export const updateNote = (notes, newNote, token) => (dispatch) => {
    axios.post(`${API_URL}/notes/update/${newNote._id}`, newNote, {
        headers: {
            Authorization: token // token of authorized user
        }
    })
        .then(async () => {
            const res = await axios.get(`${API_URL}/notes`, {
                headers: {
                    Authorization: token // token of authorized user
                }
            })
            dispatch(setNotes(res.data))
        })
}

export const addNote = (notes, userId, token) => (dispatch) => {
    const newNote = {
        title: '',
        text: '',
        isStarred: false,
        tags: [],
        userId
    }
    notes = [...notes, newNote]
    axios.post(`${API_URL}/notes/add`, newNote, {
        headers: {
            Authorization: token // token of authorized user
        }
    })
        .then(async () => {
            const res = await axios.get(`${API_URL}/notes`, {
                headers: {
                    Authorization: token // token of authorized user
                }
            })
            dispatch(setNotes(res.data))
        })
}

export const deleteNote = (notes, id) => (dispatch) => {

    axios.delete(`${API_URL}/notes/delete/${id}`).then((res) => {
        dispatch(setNotes(notes.filter((note) => note._id !== id)))
    }).catch(err => console.log(err))
}