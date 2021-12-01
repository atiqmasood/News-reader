<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Change title</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-on:input="onChangeTitle($event)"
              :rules="[rules.required, rules.counter]"
              label="Title*"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show = false"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="saveTitle()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    value: Boolean,
    onChangeTitle: Function,
    saveTitle: Function,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Title is required.",
        counter: (value) => value?.length <= 50 || "Max 50 characters",
      },
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
