<template>
  <div>
    <h2>List Countries</h2>
    <div>
      <div v-for="country in paginatedCountries" :key="country">
        <div><img :src="country.flags.png" class="" /></div>
        <div>{{ country.name.official }}</div>
        <div>{{ country.cca2 }}</div>
        <div>{{ country.cca3 }}</div>
        <div>{{ country.name.nativeName }}</div>
        <div>{{ country.altSpellings.join(", ") }}</div>
        <div>{{ country.idd.root + country.idd.suffixes }}</div>
      </div>
    </div>
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      countries: [],
      currentPage: 1,
      perPage: 25,
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
  },
};
</script>

<style>
/* Add your styles here */
</style>
