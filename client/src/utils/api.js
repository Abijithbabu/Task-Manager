import axios from "./axios";

export const AddTask = async (data) => {
    const formData = new FormData()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    const res = await axios.post('/api/addTask', formData)
    return res
}

export const getData = async (id)=>{
    return await axios.get(`/api/viewTask?id=${id}`)
}
export const DeleteTask = async (id)=>{
    return await axios.delete(`/api/deleteTask/${id}`)
}

export const EditTask = async (data)=>{
    const formData = new FormData()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return await axios.post('/api/editTask',formData)
}

export const login = async(data)=>await axios.post('/auth/login',data)
export const Register = async(data)=>await axios.post('/auth/register',data)