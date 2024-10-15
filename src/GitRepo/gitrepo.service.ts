import http from '../axios-instance'

export const getAll = (username: string) => {
    return http.get(`/search/users?q=${username}`);
}