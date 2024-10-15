import http from '../axios-instance'
import GitRepo from '../Model/GitRepo'

export const getAll = () => {
    return http.get<GitRepo[]>("githubRepo");
}