<template>


  <div
    data-role="splitter"
    class="h-100"
    data-split-mode="vertical"
    data-split-sizes="90, 10"
    data-min-sizes="100"
  >
    <div data-role="splitter" class="h-100" data-split-sizes="70, 30">
      <div class="d-flex flex-justify-center">
        <div class="chat-wrap" ref="block">
          
            <Message
              v-for="m in messages"
              :key="m.text"
              :name="m.name"
              :text="m.text"
              :owner="m.id===user.id"
            />
          
        </div>
      </div>
      <div class="d-flex flex-justify-center">This is panel 2</div>
    </div>

    <div class="d-flex flex-justify-start flex-align-center">
      <div class="new-message-wrap">
        <div class="row">
          <div class="cell">
            <textarea
              data-role="textarea"
              data-auto-size="false"
              data-clear-button="false"
              v-model="newMessage"
              @keydown.enter="send"
            ></textarea>
          </div>
          <div class="cell-auto">
            <button class="button success" @click="send">Отправить</button>
          </div>
        </div>
      </div>
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
    userWriting() {
      this.$socket.emit("writing", {
        writing: true,
        room: this.user.room
      });
    },

    send() {
    if(this.newMessage.length){
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
    }
  },
  watch: {
    messages() {
     
      
      this.$nextTick(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  },
  mounted() {
    Metro.init();
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
  overflow: auto;
  width: 100%;
  transition: all .5s;
}
.message-wrap {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 1rem;
  overflow-y: auto;
}
.new-message-wrap {
  padding: 1rem;
  width: 100%;
}
</style>