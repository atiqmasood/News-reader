<template>
  <v-container>
    <div class="heading">Headlines</div>
    <search-text :onFilterSource="onFilterSource" />
    <div v-if="isLoading" class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <card v-else v-bind:articles="articles" :toggleDialog="toggleDialog" />
    <title-modal
      v-model="isOpenDialog"
      v-bind:onChangeTitle="onChangeTitle"
      v-bind:saveTitle="saveTitle"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
import SearchText from "../components/SearchText.vue";
import TitleModal from "../components/TitleModal.vue";

export default {
  name: "Dashboard",
  components: {
    Card,
    TitleModal,
    SearchText,
  },
  data: () => ({
    isOpenDialog: false,
    newTitle: "",
    articles: null,
    currentIndex: null,
    selectedSource: null,
  }),
  methods: {
    ...mapActions(["getNewsListAction", "changeTitle"]),
    // change title dialog
    toggleDialog(index) {
      this.currentIndex = index;
      this.isOpenDialog = !this.isOpenDialog;
    },
    // on change title
    onChangeTitle(e) {
      this.newTitle = e;
    },
    onFilterSource(e) {
      this.selectedSource = e;
      if (this.newsArticles?.length > 0 && this.selectedSource) {
        this.articles = this.newsArticles.filter((art) => art.source?.id === this.selectedSource);
      }
    },

    // save title
    saveTitle() {
      this.newsList[this.currentIndex] = {
        ...this.newsList[this.currentIndex],
        title: this.newTitle,
      };
      this.isOpenDialog = false;
      this.articles = [];
      this.onChangeTitle(this.newsList);
    },
  },
  computed: {
    ...mapGetters({ newsArticles: "getNewsList", isLoading: "getLoading" }),
    // on fitler news list on selected source
    newsList() {
      if (this.newsArticles?.length > 0 && this.selectedSource) {
        return this.newsArticles.filter((art) => art.source?.id === this.selectedSource);
      }
      return this.newsArticles;
    },
  },
  // when component mounted fetch api
  mounted() {
    this.getNewsListAction();
  },
  // when component updated
  updated() {
    this.articles = this.newsList;
  },
};
</script>
<style>
.heading {
  font-size: 28px;
  font-weight: 300;
  color: grey;
}
</style>
