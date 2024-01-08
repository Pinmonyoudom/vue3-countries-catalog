<template>
  <v-container fluid class="text-center pt-4">
    <h1 class="mb-4">Countries Catalog Implementation</h1>
    <v-text-field
      pattern="[a-zA-Z\s&\d]"
      v-model="search"
      append-icon="mdi-magnify"
      label="Search by Country Name"
      hide-details
      dense
      single-line
      outlined
      class="mb-8"
    ></v-text-field>
    <v-row justify="center">
      <v-col v-for="(item, index) in listCountries" :key="index">
        <div @click="openModal(item)">
          <img
            :src="item.flags.png"
            class="clickable"
            style="width: 230px; height: 100px"
          />
        </div>
        <div @click="openModal(item)" class="clickable">
          {{ item.name.official }}
        </div>
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      @input="changePage"
      class="mt-8"
    ></v-pagination>
    <v-dialog persistent v-model="detailDialog" max-width="140vh">
      <v-card outlined>
        <v-toolbar light flat class="grey lighten-2 font-weight-medium">
          <v-toolbar-title class="title"
            >Country Name : {{ selectedCountry.countryName }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon dark color="black" @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-row>
            <v-col cols="3">
              <div class="rounded" style="border: 1px solid #d1d1d1">
                <img
                  :src="selectedCountry.imageFlag"
                  style="width: 215px; height: 210px"
                />
              </div>
            </v-col>
            <v-col cols="9">
              <v-row class="black--text subtitle-1">
                <v-col cols="4" :style="{ 'white-space': 'nowrap' }">
                  2 character Country Code:
                </v-col>
                <v-col class="font-weight-bold">
                  {{ selectedCountry.twoCharacterCountryCode }}
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0"> 3 character Country Code: </v-col>
                <v-col class="pt-0 font-weight-bold">
                  {{ selectedCountry.threeCharacterCountryCode }}
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0"> Native Country Name: </v-col>
                <v-col class="pt-0 font-weight-bold"> 
                  {{ selectedCountry.nativeCountryName }}
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0"> Alternative Country Name: </v-col>
                <v-col class="pt-0 font-weight-bold">
                  {{ selectedCountry.alternativeCountryName }}
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0"> Country Calling Codes: </v-col>
                <v-col class="pt-0 font-weight-bold"> 
                  {{ selectedCountry.countryCallingCodes }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      detailDialog: false,
      selectedCountry: {},
    };
  },
  computed: {
    filteredCountries() {
      const searchRegex = new RegExp(this.search, "i");
      return this.countries.filter(
        (country) =>
          searchRegex.test(country.name.official)
      );
    },
    listCountries() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredCountries.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.filteredCountries.length / this.perPage);
    },
  },
  watch: {
    search() {
      this.currentPage = 1;
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
    openModal(item) {
      this.selectedCountry = {
        countryName: item.name.official,
        imageFlag: item.flags.png,
        twoCharacterCountryCode: item.cca2,
        threeCharacterCountryCode: item.cca3,
        nativeCountryName: this.getFirstNativeName(item.name.nativeName),
        alternativeCountryName: item.altSpellings.join(", "),
        countryCallingCodes: item.idd.root + item.idd.suffixes
      };
      this.detailDialog = true;
    },
    closeModal() {
      this.detailDialog = false;
    },
    getFirstNativeName(nativeName) {
      if (nativeName) {
        const firstKey = Object.keys(nativeName)[0];
        if (firstKey && nativeName[firstKey] && nativeName[firstKey].official) {
          return nativeName[firstKey].official;
        }
      }
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
