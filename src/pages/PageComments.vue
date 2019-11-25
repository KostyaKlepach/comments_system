<template>
  <q-page ref="pageChat" class="flex column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        bg-color="primary"
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from"
        :text="[message.text]"
      />
      <!-- :sent="message.from == 'me' ? true : false" -->
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
      'firebaseSendMessage'
    ]),
    sendMessage () {
      if (this.newMessage !== '') {
        this.firebaseSendMessage({
          message: {
            text: this.newMessage,
            from: this.userDetails.name
          },
          postId: this.$route.params.postId
        })
      }
      this.clearMessage()
    },
    clearMessage () {
      this.newMessage = ''
      this.$refs.newMessage.$el.focus()
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

<style></style>
