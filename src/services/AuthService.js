import apiClient from '@/lib/apiClient'
import { catchError } from '@/utils/catchError'

const getMe = async () => {
  try {
    const { data } = await apiClient.get(`/auth/profile`)

    const userData = {
      user: data.data.user,
    }

    return userData
  } catch (error) {
    throw new Error(catchError(error))
  }
}

const login = async (email, password) => {
  try {
    const url = `/auth/login`
    const { data } = await apiClient.post(url, { email, password })
    const userData = {
      user: data.data.user,
      token: data.data.token,
    }
    return userData
  } catch (error) {
    throw new Error(catchError(error))
  }
}

const signUp = async ({ email, password, name }) => {
  try {
    const url = `/auth/register`
    const { data } = await apiClient.post(url, { email, password, name })
    const userData = {
      user: data.data.user,
    }
    return userData
  } catch (error) {
    throw new Error(catchError(error))
  }
}

export const refreshToken = async (refreshToken) => {
  try {
    const url = `/auth/refresh-tokens`
    const { data } = await apiClient.post(url, refreshToken)

    const userData = {
      user: data.data.user,
      token: data.data.token,
    }
    return userData
  } catch (error) {
    throw new Error(catchError(error))
  }
}

export const logout = async (refreshToken) => {
  try {
    const url = `/auth/logout`
    const { data } = await apiClient.post(url, refreshToken)

    return data.data
  } catch (error) {
    throw new Error(catchError(error))
  }
}

export const changePassword = async (passwordFields) => {
  try {
    const url = `/auth/change-password`
    const { data } = await apiClient.post(url, passwordFields)
    const userData = {
      user: data.data.user,
      token: data.data.token,
    }
    return userData
  } catch (error) {
    throw new Error(catchError(error))
  }
}

export const updateProfile = async (userId, userFields) => {
  try {
    const url = `/users/${userId}`
    const { data } = await apiClient.post(url, userFields)

    return data.data
  } catch (error) {
    throw new Error(catchError(error))
  }
}

const AuthService = {
  getMe,
  login,
  signUp,
  refreshToken,
  logout,
  changePassword,
  updateProfile,
}

export default AuthService
