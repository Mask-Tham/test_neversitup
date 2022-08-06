<template>
  <v-app>
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer> -->

    <!-- <v-app-bar app>
    </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <template #footer>
      <div>
        <v-footer app>
          <!-- -->
        </v-footer>
      </div>
    </template>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>