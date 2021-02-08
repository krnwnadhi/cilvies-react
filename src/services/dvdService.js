import httpClient from '../common/http';

class dvdService {
    retrieveAll() {
        return httpClient.get('/dvd')
    };

    searchByTitle(title) {
        return httpClient.get(`/dvd?title=${title}`)
    };

    retrieveById(id) {
        return httpClient.get(`/dvd/${id}`)
    };

    create(data) {
        return httpClient.post('/dvd', data)
    };

    update(id, data) {
        return httpClient.put(`/dvd/${id}`, data)
    };

    delete(id) {
        return httpClient.delete(`/dvd/${id}`)
    };

    deleteAll() {
        return httpClient.delete('/dvd')
    };

};

export default new dvdService();