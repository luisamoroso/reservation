<template>
  <v-row class="text-center">
    <v-col>
      <h1 class="grey--text text--darken-2">{{title}}</h1>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Title",
  props: ["title"]
};
</script>