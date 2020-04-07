<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" stateless>
      <!-- -->

      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>

        <v-list-item v-for="user in users" :key="user.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id === 2 ? 'deep-purple accent-4' : 'grey'">mdi-chat</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit()">
        <v-icon>mdi-logout mdi-rotate-180</v-icon>
      </v-btn>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <div>
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      users: [
        { id: 1, name: "Name1" },
        { id: 2, name: "Name2" }
      ]
    };
  },

  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$router.push("/?message=leftChat");
      this.clearData();
    }
  }
};
</script>
