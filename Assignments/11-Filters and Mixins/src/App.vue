<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <!-- Exercise 1) -->
        <!-- Build a local Filter which reverses the Text it is applied on -->
        <p>{{ "Some Text" | reverse }}</p>
        <!-- Exercise 2 -->
        <!-- Build a global Filter which counts the length of a word and it appends it -->
        <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
        <p>{{ "Maximillian Arruda" | calculateTextLength }}</p>
        <!-- Exercise 3 -->
        <!-- Do the same as in Exercises 1 & 2, now with Computed Properties -->
        <p>{{ reversedText }}</p>
        <p>{{ nameWithLength }}</p>
        <!-- Exercise 4 -->
        <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
        <p>{{ reversedTextViaMixin }}</p>
        <p>{{ nameWithLengthViaMixin }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reversedTextViaMixin } from "./reversedTextViaMixin";
import { nameWithLengthViaMixin } from "./nameWithLengthViaMixin";

export default {
  mixins: [reversedTextViaMixin, nameWithLengthViaMixin],
  data() {
    return {
      someText: "Some Text",
      myName: "Maximillian Arruda"
    };
  },
  filters: {
    reverse: value => {
      return value
        .split("")
        .reverse()
        .join("");
    }
  },
  computed: {
    reversedText() {
      return this.someText
        .split("")
        .reverse()
        .join("");
    },
    nameWithLength() {
      return `${this.myName} (${this.myName.length})`;
    }
  }
};
</script>

<style>
</style>
