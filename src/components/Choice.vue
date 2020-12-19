<template>
  <div class="choice">
    <label>{{ question.label }}</label>
    <template v-for="choice in question.choices">
      <label :key="choice.value">
        {{ choice.label }}
        <input
          :type="type"
          :name="question.id"
          :value="choice.value"
        >
      </label>
    </template>
    <p>{{ question.suffix }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Choice extends Vue {
  @Prop() private question!: Record<string, unknown>;

  get type(): string {
    return this.question.multiple_choice ? 'checkbox' : 'radio';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
