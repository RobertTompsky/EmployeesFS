import {User} from '@prisma/client'
import { api } from './api'

//через омит удаляется строка айди, чтобы не надо было ее вводить
export type UserData = Omit<User, 'id'>
type ResponseLoginData = User & {token: string}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // в ковычках указывается, что сервер отдает и принимает
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (UserData) => ({
                url: '/user/login',
                method: 'POST',
                body: UserData
            }),
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (UserData) => ({
                url: '/user/register',
                method: 'POST',
                body: UserData
            }),
        }),
        current: builder.query<ResponseLoginData, void>({
            query: () => ({
                url: '/user/current',
                method: 'GET'
            }),
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useCurrentQuery} = authApi
export const {endpoints: {login, register, current}} = authApi