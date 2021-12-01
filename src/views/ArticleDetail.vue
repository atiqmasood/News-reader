<template>
  <div>
    <v-card class="my-12" height="auto">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>
      <v-img height="180" :src="articleDetail.urlToImage"></v-img>
      <v-card-title>
        {{ articleDetail.title }}
      </v-card-title>
      <v-card-text>
        <div class="my-4 text-subtitle-1">{{ articleDetail.author }}</div>
        <div>{{ articleDetail.description }}</div>
        <div>
          <v-chip class="deeo-purple">{{ formateDate(articleDetail.publishedAt) }}</v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  methods: {
    formateDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  computed: {
    ...mapGetters({ articleDetail: "detailGetter" }),
  },
};
</script>
