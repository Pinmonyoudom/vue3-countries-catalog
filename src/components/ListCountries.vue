<template>
  <v-container fluid class="text-center pt-4">
    <h1 class="mb-4">Countries Catalog Implementation</h1>
    <v-text-field
      pattern="[a-zA-Z\s&\d]"
      v-model="search"
      append-icon="mdi-magnify"
      label="Search Country Name"
      hide-details
      dense
      single-line
      clearable
      outlined
      class="mb-8"
    ></v-text-field>
    <v-row justify="center">
      <v-col v-for="country in paginatedCountries" :key="country" cols="12" sm="6" md="4" lg="3">
        <div><img :src="country.flags.png" class="" /></div>
        <div>{{ country.name.official }}</div>
        <div>{{ country.cca2 }}</div>
        <div>{{ country.cca3 }}</div>
        <div>{{ getFirstNativeName(country.name.nativeName) }}</div>
        <div>{{ country.altSpellings.join(", ") }}</div>
        <div>{{ country.idd.root + country.idd.suffixes }}</div>
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      @input="changePage"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      countries: [],
      currentPage: 1,
      perPage: 25,
      search: "",
    };
  },
  computed: {
    paginatedCountries() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.countries.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.countries.length / this.perPage);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        this.countries = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    getFirstNativeName(nativeName) {
      const firstKey = Object.keys(nativeName)[0];
      return nativeName[firstKey].official;
    },
  },
};
</script>

<style>

</style>
