<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="searchText"
            @change="onSearch"
            label="Search"
            solo-inverted
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            @change="onFilterSource"
            :items="sourcesList"
            item-text="name"
            item-value="id"
            label="Filter by source"
            solo
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    onFilterSource: Function,
  },
  data: () => ({
    searchText: "",
    sources: [],
  }),
  methods: {
    ...mapActions(["getSourcesList", "onSearchFilter", "getNewsListAction"]),
    onSearch() {
      if (this.searchText) {
        this.onSearchFilter(this.searchText);
      } else {
        this.getNewsListAction();
      }
    },
  },
  computed: {
    ...mapGetters({ sourcesList: "sourcesGetter" }),
  },
  mounted() {
    this.getSourcesList();
  },
};
</script>
