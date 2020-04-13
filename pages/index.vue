<template>


<form data-role="validator" class="login-form p-6 mx-auto border win-shadow" action="javascript:">
        
        <h2 class="text-light">Введите логин/пароль</h2>
        <hr class="thin mt-4 mb-4 bg-white">
        <div class="form-group">
            <input type="text" placeholder="Логин..."  data-validate="required minlength=6">
        </div>
        <div class="form-group">
            <input type="password" data-role="input" placeholder="Enter your password..." data-validate="required minlength=6">
        </div>
        <div class="form-group mt-4">
        
            <button class="button success">Submit form</button>
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
    message:'',
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
mounted(){
const {message}=this.$route.query;
if(message === 'noUser')
{
  this.message='Введите данные';
  
}
else if(message==='leftChat'){
  this.message='Пользователь вышел из чата';
}
this.snackbar=!!this.message;

},
  methods: {
    ...mapMutations(["setUser"]),

    submit() {

      console.log(this.name);
      
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

<style scoped>
    .login-form {
            max-width: 400px;
            height: auto;
            top: 50%;
            
        }
</style>