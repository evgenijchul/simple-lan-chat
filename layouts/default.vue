<template>
  <div id="app">
    <div class="grid">
      <div class="row">
        <div class="cell bg-white h-vh-100">
          <!-- окно чата -->
          <nuxt />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: true
    };
  },

  computed: mapState(["user", "users"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?message=leftChat");
        this.clearData();
      });
    }
  }
};
</script>
