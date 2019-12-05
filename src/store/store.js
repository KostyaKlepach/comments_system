import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'
let messagesRef

const state = {
  userDetails: {
    name: 'Happy emOcean User',
    email: 'johndoe@gmail.com',
    //uid: '123'
    uid: '456'
  },
  posts: {
    id1: { name: 'post1' },
    id2: { name: 'post2' },
    id3: { name: 'post3' },
    id4: { name: 'post4' }
  },
  messages: {}
}
const mutations = {
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
  removeMessage(state, payload) {
    Vue.delete(state.messages, payload.messageId)
  },
  clearMessages(state) {
    state.messages = {}
  }
}
const actions = {
  firebaseGetMessages({ commit, state }, postId) {
    messagesRef = firebaseDb.ref('posts/' + postId + '/comments')
    messagesRef.on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
    messagesRef.on('child_removed', snapshot => {
      let messageId = snapshot.key
      commit('removeMessage', {
        messageId
      })
    })
  },
  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  firebaseSendMessage({}, payload) {
    firebaseDb
      .ref('posts/' + payload.message.postId + '/comments')
      .push(payload.message)
  },
  firebaseDeleteMessage({}, payload) {
    const messageRef = firebaseDb.ref(
      'posts/' + payload.postId + '/comments/' + payload.id
    )
    messageRef.remove()
  }
}
const getters = {
  posts: state => {
    return state.posts
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
