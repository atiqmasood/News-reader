import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const baseUrl = "https://newsapi.org/v2";
const apiKey = "099148be22804e849a0c6fe022b7cf5e";
export default new Vuex.Store({
  state: {
    newsList: [],
    sourcesList: [],
    newsDetail: {},
    isLoading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setNewsList(state, payload) {
      state.newsList = payload;
    },
    setNewsDetail(state, payload) {
      state.newsDetail = payload;
    },
    setSourcesList(state, payload) {
      state.sourcesList = payload;
    },
  },
  actions: {
    async getNewsListAction(state) {
      state.commit("setLoading", true);
      const news = await axios.get(`${baseUrl}/top-headlines?country=us&apiKey=${apiKey}`);
      state.commit("setLoading", false);
      state.commit("setNewsList", news?.data?.articles);
    },
    async getSourcesList(state) {
      const sources = await axios.get(`${baseUrl}/sources?apiKey=${apiKey}`);
      let sourceList = sources?.data?.sources;
      sourceList = [...[{ id: null, name: "All" }], ...sourceList];
      state.commit("setSourcesList", sourceList);
    },
    getDetail(state, payload) {
      state.commit("setNewsDetail", payload);
    },
    async onSearchFilter(state, payload) {
      state.commit("setLoading", true);
      const search = await axios.get(
        `${baseUrl}/top-headlines?q=${payload ?? ""}&apiKey=${apiKey}`
      );
      state.commit("setLoading", false);
      state.commit("setNewsList", search?.data?.articles);
    },
    changeTitle(state, payload) {
      state.commit("setNewsList", payload);
    },
  },
  modules: {},
  getters: {
    getNewsList: (state) => state.newsList,
    getLoading: (state) => state.isLoading,
    detailGetter: (state) => state.newsDetail,
    sourcesGetter: (state) => state.sourcesList,
  },
});
