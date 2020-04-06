<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      
      <v-card>


      </v-card>

      </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect:function() {
      console.log("IO connected!");
    }
  },
methods:{
  message(){
    this.$socket.emit('createMessage', {
      text:'FROME CLIENT'
    })
  }
},
  components: {}
};
</script>
