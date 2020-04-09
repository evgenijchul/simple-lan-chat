<template>
  <div class="chat-wrap">
    <div class="message-wrap">
      <Message v-for="m in messages" :key="m.text" :name="m.name" :text="m.text" :owner="m.id===user.id" />
    </div>

    <div class="new-message-wrap">
      <v-text-field @input="userWriting" outlined label="Enter Message" v-model="newMessage" @keydown.enter="send"></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/Message";

export default {
  middleware: ["chat"],
  head() {
    return {
      title: `Комната ${this.user.room}`
    };
  },
  data: () => ({
    newMessage: ""
  }),
  computed: mapState(["user", "messages"]),
  methods: {
    userWriting(){
console.log('writing');

    },
    send() {
      this.$socket.emit(
        "createMessage",
        {
          text: this.newMessage,
          id: this.$store.state.user.id
        },
        data => {
          this.newMessage = "";
        }
      );
    }
  },
  components: {
    Message
  }
};
</script>
<style lang="css" scoped>
.chat-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.message-wrap {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
.new-message-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: grey;
}
</style>