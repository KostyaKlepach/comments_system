<template>
  <q-page ref="pageChat" class="flex column">
    <div class="q-pa-md justify-end">
      <div class="column">
        <div>
          <div v-for="(message, key) in messages" :key="key" class="row no-wrap">
            <q-chat-message
              bg-color="primary"
              :name="message.from"
              :uid="message.userId"
              :text="[message.text]"
              avatar="https://cdn.quasar.dev/img/avatar1.jpg"
              :stamp="message.postTime"
            />
            <div class="column justify-center q-mt-sm" v-if="message.userId==userDetails.uid">
              <q-btn
                @click="deleteMessage(message, key)"
                flat
                round
                color="secondary"
                icon="delete"
                size="xs"
              />
              <!-- <q-btn @click="tester" flat round color="secondary" icon="edit" size="xs" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          v-model="newMessage"
          ref="newMessage"
          bg-color="white"
          outlined
          rounded
          placeholder="Message"
          dense
          @keyup.enter="sendMessage"
          class="full-width"
        >
          <template v-slot:after>
            <q-btn @click="sendMessage" round dense flat type="submit" color="white" icon="send" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      newMessage: ''
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails']),

  },
  methods: {
    ...mapActions('store', [
      'firebaseGetMessages',
      'firebaseStopGettingMessages',
      'firebaseSendMessage',
      'firebaseDeleteMessage'
    ]),
    sendMessage () {
      if (this.newMessage !== '') {
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: this.userDetails.name,
            userId: this.userDetails.uid,
            postId: this.$route.params.postId,
            postTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
        })
      }
      this.clearMessage()
    },
    clearMessage () {
      this.newMessage = ''
      this.$refs.newMessage.$el.focus()
    },
    deleteMessage (message, key) {
      if (this.userDetails.uid == message.userId)
        this.firebaseDeleteMessage({ postId: message.postId, id: key })
    },
    tester () {
      console.log(this.userDetails.uid == message.userId)
    },
    scrollToBottom () {
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20)
    }
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
      }
    }
  },
  //lifecycle hook for get all prev messages
  mounted () {
    this.firebaseGetMessages(this.$route.params.postId)
  },
  //stop listnening for comments changes
  destroyed () {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style>
</style>
