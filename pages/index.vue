<template>
  <div class="card">
    
    <v-snackbar v-model="snackbar" :timeout="6000" top>
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <div class="card-header">
      <div class="card-title">NUXT chat</div>
    </div>
    <div class="card-content">
      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="room">
        <b-input v-model="room"></b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  layout: "empty",
  head: {
    title: "Добро пожаловать в чат"
  },
  data: () => ({
    message: "",
    snackbar: false,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Введите имя",
      v => (v && v.length <= 16) || "Имя не должно превышать 16 символов"
    ],
    room: "",
    roomRules: [v => !!v || "Введите комнату"]
  }),

  sockets: {
    connect: function() {
      console.log("IO connected!");
    }
  },
  mounted() {
    const { message } = this.$route.query;
    if (message === "noUser") {
      this.message = "Введите данные";
    } else if (message === "leftChat") {
      this.message = "Пользователь вышел из чата";
    }
    this.snackbar = !!this.message;
  },
  methods: {
    ...mapMutations(["setUser"]),

    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit("userJoined", user, data => {
          if (typeof data === "string") {
            console.log(data);
          } else {
            user.id = data.userId;

            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    }
  },
  components: {}
};
</script>
