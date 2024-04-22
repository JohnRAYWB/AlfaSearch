import axios from "axios";

const baseUrl = 'http://localhost:5000'

export const getEntitiesFromDB = async (query, page) => {
    return (await axios.post(`${baseUrl}/entity/?page=${page}`, {query: query})).data
}

export const getOuterEntities = async (query, page) => {
    return (await axios.post(`${baseUrl}/entity/search/?page=${page}`, {query: query})).data
}
