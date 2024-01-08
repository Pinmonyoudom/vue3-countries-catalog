<template>
  <v-app>
    <v-main>
      <ListCountries/>
    </v-main>
  </v-app>
</template>

<script>
import ListCountries from './components/ListCountries';

export default {
  name: 'App',

  components: {
    ListCountries
  },

  data: () => ({
    
  }),
};
</script>
