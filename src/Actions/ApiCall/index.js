import axios from "axios"
import { API_ROOT } from "utilities/constants"

export const createNewBoard = async (data) => {
    const request = await axios.post(`${API_ROOT}/routers/boards`, data)
    console.log(request)
    return request.data
}

export const updateBoard = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/routers/boards/${id}`, data)
    console.log(request)
    return request.data
}

export const fetchBoardDetails = async (id, data) => {
    const request = await axios.get(`${API_ROOT}/routers/boards/${id}`, data)
    console.log(request)
    return request.data
}

export const fetchAllBoard = async (data) => {
    const request = await axios.get(`${API_ROOT}/routers/boards`, data)
    console.log(request)
    return request.data
}

export const deleteBoard = async (id) => {
    const request = await axios.delete(`${API_ROOT}/routers/boards/${id}`)
    console.log(request)
    return request.data
}

export const createNewColumn = async (data) => {
    const request = await axios.post(`${API_ROOT}/routers/columns`, data)
    console.log(request)
    return request.data
}

export const updateColumn = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/routers/columns/${id}`, data)
    console.log(request)
    return request.data
}

export const createNewCard = async (data) => {
    const request = await axios.post(`${API_ROOT}/routers/cards`, data)
    console.log(request)
    return request.data
}

export const updateCard = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/routers/cards/${id}`, data)
    console.log(request)
    return request.data
}

export const updateDetailCard = async (data) => {
    const request = await axios.put(`${API_ROOT}/routers/cards/details`, data)
    console.log(request)
    return request.data
}

export const deleteCard = async (id) => {
    const request = await axios.delete(`${API_ROOT}/routers/cards/${id}`)
    console.log(request)
    return request.data
}

export const fetchCardDetails = async (id) => {
    const request = await axios.get(`${API_ROOT}/routers/cards?id=${id}`)
    return request.data
}

export const login = async (id, data) => {
    const request = await axios.post(`${API_ROOT}/routers/login/${id}`, data)
    console.log(request)
    return request.data
}

export const register = async (data) => {
    const request = await axios.post(`${API_ROOT}/routers/users`, data)
    console.log(request)
    return request.data
}

export const fetchAllUser = async (data) => {
    const request = await axios.get(`${API_ROOT}/routers/users`, data)
    console.log(request)
    return request.data
}

export const updateUser = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/routers/users/${id}`, data)
    console.log(request)
    return request.data
}

export const deleteUser = async (id) => {
    const request = await axios.delete(`${API_ROOT}/routers/users/${id}`)
    console.log(request)
    return request.data
}

export const fetchUserDetails = async (id) => {
    const request = await axios.get(`${API_ROOT}/routers/users/getall/${id}`)
    return request.data
}


export const createNewMilestone = async (data) => {
    const request = await axios.post(`${API_ROOT}/routers/miles`, data)
    console.log(request)
    return request.data
}


export const getAllColumnByBoard = async (boardId) => {
    const request = await axios.get(`${API_ROOT}/routers/boards/getBoard/${boardId}`)
    console.log(request)
    return request.data
}

export const getAllMileByBoard = async (boardId) => {
    const request = await axios.get(`${API_ROOT}/routers/boards/getMile/${boardId}`)
    console.log(request)
    return request.data
}


export const updateMile = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/routers/miles/${id}`, data)
    console.log(request)
    return request.data
}

export const deleteMile = async (id) => {
    const request = await axios.delete(`${API_ROOT}/routers/miles/deleteMile/${id}`)
    console.log(request)
    return request.data
}

export const getBoardByProject = async (projectId) => {
    const request = await axios.get(`${API_ROOT}/routers/projects/getBoard/${projectId}`)
    console.log(request)
    return request.data
}

export const getAllProject = async () => {
    const request = await axios.get(`${API_ROOT}/routers/projects/getallProject`)
    console.log(request)
    return request.data
}

export const createNewProject = async (data) => {
    const request = await axios.post(`${API_ROOT}/routers/projects`, data)
    console.log(request)
    return request.data
}

export const deleteProject = async (id) => {
    const request = await axios.delete(`${API_ROOT}/routers/projects/${id}`)
    console.log(request)
    return request.data
}