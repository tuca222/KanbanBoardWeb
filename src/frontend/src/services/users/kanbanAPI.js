import api from '../core/core-api'

const loginpath = '/login'
const logoutpath = '/logout'
const userspath = '/users'
const boardspath = '/boards'
const cardspath = '/cards'

const kanbanAPI = {
  initiaRequest(){
    return api.get('/')
  },
  loginUser(){
    return api.post(`${loginpath}/`)
  },
  logoutUser(){
    return api.get(`${logoutpath}/`)
  },
  createUser(){
    return api.post(`${userspath}/`)
  },
  readUser(userId){
    return api.get(`${userspath}/${userId}`)
  },
  updateUder(userId){
    return api.patch(`${userspath}/${userId}`)
  },
  delete(userId){
    return api.delete(`${userspath}/${userId}`)
  },
  createBoards(userId){
    return api.post(`${userspath}/${userId}/${boardspath}`)
  },
  getAllBoards(userId){
    return api.get(`${userspath}/${userId}/${boardspath}`)
  },
  readBoards(userId, boardId){
    return api.get(`${userspath}/${userId}/${boardspath}/${boardId}`)
  },
  updateTitleBoards(userId, boardId){
    return api.patch(`${userspath}/${userId}/${boardspath}/${boardId}`)
  },
  shareBoards(userId, boardId){
    return api.post(`${userspath}/${userId}/${boardspath}/${boardId}/share`)
  },
  getEditoreBoard(userId, boardId){
    return api.get(`${userspath}/${userId}/${boardspath}/${boardId}/editores`)
  },
  deleteBoards(userId, boardId){
    return api.delete(`${userspath}/${userId}/${boardspath}/${boardId}`)
  },
  createCard(userId, boardId){
    return api.post(`${userspath}/${userId}/${boardspath}/${boardId}/${cardspath}`)
  },
  readCard(userId, boardId, cardId){
    return api.get(`${userspath}/${userId}/${boardspath}/${boardId}/${cardspath}/${cardId}`)
  },
  updateCard(userId, boardId, cardId){
    return api.patch(`${userspath}/${userId}/${boardspath}/${boardId}/${cardspath}/${cardId}`)
  },
  deleteCard(userId, boardId, cardId){
    return api.delete(`${userspath}/${userId}/${boardspath}/${boardId}/${cardspath}/${cardId}`)
  }
}

export default kanbanAPI