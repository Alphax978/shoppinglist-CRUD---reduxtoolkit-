import axios from "axios"


export function addItem(item) {
    return axios.post("http://localhost:8080/cart",item)
}
export function readItem() {
    return axios.get("http://localhost:8080/cart")
}
export function deleteItem(id) {
    return axios.delete(`http://localhost:8080/cart/${id}`)
}
export function updateItem(id, newitem) {
    return axios.patch(`http://localhost:8080/cart/${id}`,newitem)
}
