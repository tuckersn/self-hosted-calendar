import { configureStore } from '@reduxjs/toolkit'
import { debugReducer } from './debugSlice'
import { userReducer } from './userSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		debug: debugReducer
	}
})

