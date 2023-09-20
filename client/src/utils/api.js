import axios from "./axios";

export const AddTask = async (data) => {
    const formData = new FormData()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    const res = await axios.post('/addTask', formData)
    return res
}

export const getData = async ()=>{
    return await axios.get('/viewTask')
}
export const DeleteTask = async (id)=>{
    return await axios.delete(`/deleteTask/${id}`)
}

export const EditTask = async (data)=>{
    const formData = new FormData()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return await axios.post('/editTask',formData)
}