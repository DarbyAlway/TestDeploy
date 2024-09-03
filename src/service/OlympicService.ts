import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ananta46/331-Project1-Olympic-Db/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCountries(perPage: Number, page: Number) {
    return apiClient.get('/countries?_limit=' + perPage + '&_page=' + page)
  },
  getCountry(id: number) {
    return apiClient.get('/countries/' + id)
  }
}
