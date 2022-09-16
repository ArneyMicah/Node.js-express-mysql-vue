import api from './axios'
export function getTable() {
    return api({
        url: '/getTable',
        method: 'GET',
    })
}
export function addTableApi(data) {
    console.log(data);
    return api({
        url: '/addTable',
        method: 'POST',
        data
    })
}
export function deleteApi(data) {
    return api({
        url: '/delete',
        method: 'DELETE',
        params: data,
    })
}
export function searchApi(data) {
    return api({
        url: '/search',
        method: 'GET',
        params: data,
    })
}
export function editApi(data) {
    console.log(data);
    return api({
        url: '/compile',
        method: 'PUT',
        data,
    })
}