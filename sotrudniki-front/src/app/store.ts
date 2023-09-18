import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import { api } from './services/api'
import { listenerMiddleware } from '../middleware/auth'
import employeesSlice from '../features/employees/employeesSlice'
// ...
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    employees: employeesSlice
  },
  // миддлвара для записи в локалсторадж
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>