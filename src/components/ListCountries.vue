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
      <v-col v-for="(item, index) in listCountries" :key="index">
        <div @click="openModal(item)">
          <img :src="item.flags.png" class="clickable" style="width: 230px; height: 100px;" />
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
    ></v-pagination>
    <v-dialog persistent v-model="detailDialog" max-width="140vh">
      <v-card outlined>
        <v-toolbar light flat class="grey lighten-2 font-weight-medium">
          <v-toolbar-title class="title">Countries Name : Territory of Christmas Island</v-toolbar-title>
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
                <!-- <v-img
                  v-if="viewedItem.picture"
                  height="250px"
                  max-width="250px"
                  class="rounded"
                  :src="
                    'https://kv-pilltech.s3.ap-east-1.amazonaws.com/' +
                      viewedItem.picture
                  "
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-1"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-img v-else :src="url + 'products/Default/PillTech-Logo.png'">
                </v-img> -->
              </div>
            </v-col>
            <v-col cols="9">
              <v-row class="black--text subtitle-1">
                <v-col cols="4" :style="{ 'white-space': 'nowrap' }">
                  2 character Country Code:
                </v-col>
                <v-col class="font-weight-bold">
                  <!-- {{ viewedItem.name }} -->ss
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0">
                  3 character Country Code:
                </v-col>
                <v-col class="pt-0 font-weight-bold">
                  <!-- {{ viewedItem.upc }} -->ssd
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0">
                  Native Country Name:
                </v-col>
                <v-col class="pt-0 font-weight-bold">
                  <!-- {{ viewedItem.categoryName }} -->ddd
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0">
                  Alternative Country Name:
                </v-col>
                <v-col class="pt-0 font-weight-bold">
                  <!-- {{ viewedItem.categoryName }} -->ddd
                </v-col>
              </v-row>
              <v-row class="black--text subtitle-1">
                <v-col cols="4" class="pt-0">
                  Country Calling Codes:
                </v-col>
                <v-col class="pt-0 font-weight-bold">
                  <!-- {{ viewedItem.categoryName }} -->ddd
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>{{ selectedCountry.name.official }}</v-card-title>
        <v-card-text>
          <div>{{ selectedCountry.cca2 }}</div>
          <div>{{ selectedCountry.cca3 }}</div>
          <div>{{ getFirstNativeName(selectedCountry.name.nativeName) }}</div>
          <div>{{ selectedCountry.altSpellings.join(", ") }}</div>
          <div>{{ selectedCountry.idd.root + selectedCountry.idd.suffixes }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
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
    listCountries() {
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
    openModal(item) {
      console.log(item, "ITEM");
      this.selectedCountry = item;
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
