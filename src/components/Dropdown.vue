<template>
  <div class="dropdown">
    <label>{{ question.label }}</label>
    <label>
      <select
        v-model="innerValue"
        :placeholder="question.placeholder"
        :required="question.required"
      >
        <option
          selected
          disabled
          value
        >{{ question.placeholder }}</option>
        <option
          v-for="choice in question.choices"
          :key="choice.value"
          :value="choice.value"
        >
          {{ choice.label }}
        </option>
      </select>
    </label>
    <p>{{ question.suffix_label }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Question } from '@/types/FormConfig';

@Component
export default class Dropdown extends Vue {
  @Prop() private question!: Question;

  @Prop() private value!: string;

  get innerValue(): string {
    return this.value;
  }

  set innerValue(val: string) {
    if (val === this.question.placeholder) {
      this.$emit('input', undefined);
    } else {
      this.$emit('input', val);
    }
  }

  beforeDestroy(): void {
    this.$emit('delete', this.question.name);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .dropdown {
    display: flex;
    flex-direction: column;
  }
</style>
