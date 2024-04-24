import axios from "axios";

const baseUrl = 'http://localhost:4221'

export const getEntitiesFromDB = async (query, page, date) => {
    return (await axios.post(`${baseUrl}/entity/?page=${page}&date=${date}`, {query: query})).data
}

export const getOuterEntities = async (query, page) => {
    return (await axios.post(`${baseUrl}/entity/search/?page=${page}`, {query: query})).data
}

export const putUpdateEntity = async (id) => {
    return (await axios.put(`${baseUrl}/entity/update/${id}`)).data
}