<template>
  <v-card>
    <v-footer padless app width="auto" class="font-weight-medium" height="50">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="black"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-row>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "TheFooter",
  data: () => ({
    links: ["Home", "About Us", "Team", "Contact Us"],
  }),
};
</script>

<style scoped>
#app > div > main > div > div.v-card.v-sheet.theme--light > footer {
  height: 10%;
}
</style>
