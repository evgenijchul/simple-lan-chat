<template>
  <form
    ref="form"
    data-role="validator"
    class="login-form p-6 mx-auto bg-white bd-default border win-shadow"
    action="javascript:"
  >
    <h2 class="text-light">Введите логин/пароль</h2>
    <hr class="thin mt-4 mb-4 bg-white" />
    <div class="form-group">
      <input
        type="text"
        placeholder="Логин..."
        data-validate="required minlength=3"
        data-role="input"
        ref="login"
        v-model="login"
      />
      <span class="invalid_feedback">Обязательно для заполнения. Не менее 3 символов.</span>
    </div>
    <div class="form-group">
      <input
        type="text"
        data-role="input"
        placeholder="Введите комнату..."
        data-validate="required"
        ref="password"
        v-model="password"
      />
      <span class="invalid_feedback">Обязательно для заполнения.</span>
    </div>

    <div class="row flex-justify-end">
      <div class="mt-4 cell-auto">
        <button class="button success" @click="submit">Войти</button>
      </div>
    </div>
  </form>
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
    login: "",
    password: "general"
  }),

  sockets: {
    connect: function() {
      console.log("IO connected!");
    }
  },
  mounted() {
    Metro.init();

    const { message } = this.$route.query;
    if (message === "noUser") {
      this.message = "Введите данные";
    } else if (message === "leftChat") {
      this.message = "Пользователь вышел из чата";
    }

    if (this.message) Metro.notify.create(this.message);
  },
  methods: {
    ...mapMutations(["setUser"]),
    validate() {
      const { login, password } = this.$refs;
      const validator = Metro.validator;

      return validator.validate(login) && validator.validate(login);
    },
    submit() {
      if (this.validate()) {
        const user = {
          name: this.login,
          room: this.password
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
    },
    invalidForm() {
      console.log("invalid form!");
    }
  },
  components: {}
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  height: auto;
  margin-top: -160px;
  top: 50%;
}
</style>