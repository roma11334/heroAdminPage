import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching : state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched : (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload
        },
        heroesFetchingError : state => {state.heroesFetchingError = 'error'},
        heroesAdd : (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes.push(action.payload)
        },
        heroesDelete : (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = state.heroes.filter(item => item.id !== action.payload )
        }
    },
})

const {actions, reducer} = heroesSlice

export default reducer

export const {
    heroesAdd,
    heroesDelete,
    heroesFetched,
    heroesFetching,
    heroesFetchingError
} = actions