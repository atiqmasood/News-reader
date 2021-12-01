<template>
  <v-row no-gutters>
    <v-col v-for="(article, i) in articles" :key="i" cols="12" sm="4">
      <v-card :loading="loading" class="my-12" max-width="374" height="400">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img height="180" :src="article.urlToImage"></v-img>
        <v-card-title>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on"> {{ minString(article.title, 50) }}</span>
            </template>
            <span>{{ article.title }}</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-chip class="deeo-purple">{{ formateDate(article.publishedAt) }}</v-chip>
        </v-card-text>
        <v-card-actions>
          <v-btn small class="ma-2" color="secondary" dark @click="toggleDialog(i)">
            Change title
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn small class="ma-2" color="primary" dark @click="navigateDetail(article)">
            Detail<v-icon dark left> mdi-arrow-right </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card></v-col
    >
  </v-row>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: {
    articles: Array,
    toggleDialog: Function,
  },
  data: () => ({
    loading: false,
    selection: 1,
    newsArticles: [],
  }),

  methods: {
    ...mapActions(["getDetail"]),
    formateDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    minString(string, maxChar = 90) {
      const result = string?.length >= maxChar ? `${string?.substr(0, maxChar - 3)}...` : string;
      return result;
    },
    navigateDetail(selectedArticle) {
      this.getDetail(selectedArticle);
      this.$router.push({ name: "Detail" });
    },
  },
};
</script>
