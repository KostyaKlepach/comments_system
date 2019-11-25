import Vue from 'vue'
import { firebaseDb } from 'boot/firebase'
let messagesRef

const state = {
  userDetails: {
    name: 'John 1231s',
    email: 'johndoe@gmail.com',
    uid: '123456'
  },
  posts: {
    id1: { name: 'post1' },
    id2: { name: 'post2' },
    id3: { name: 'post3' }
  },
  messages: {}
}
const mutations = {
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
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
  },
  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('clearMessages')
    }
  },
  firebaseSendMessage({}, payload) {
    firebaseDb
      .ref('posts/' + payload.postId + '/comments')
      .push(payload.message)
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
