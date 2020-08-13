<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/impressum">
          <v-list-item-action>
            <v-icon>mdi-bookshelf</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Impressum</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--
        <v-list-item link to="/contact">
          <v-list-item-action>
            <v-icon>mdi-bookshelf</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="light-green darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Porto Elia Taverna</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer absolute :color="brandColor" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    brandColor: "light-green darken-2"
  })
};
</script>
