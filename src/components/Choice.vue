<template>
  <div class="choice">
    <label>{{ question.label }}</label>
    <div class="choice__choices-container">
      <template v-for="choice in question.choices">
        <label :key="choice.value">
          <input
            v-model="innerValue"
            :type="type"
            :name="question.id"
            :value="choice.value"
            :required="question.required"
          >
          {{ choice.label }}
        </label>
      </template>
    </div>
    <p>{{ question.suffix_label }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Choice extends Vue {
  @Prop() private question!: Record<string, unknown>;

  @Prop({ default: () => [] }) private value!: Array<string> | string;

  get type(): string {
    return this.question.multiple_choice ? 'checkbox' : 'radio';
  }

  get innerValue(): Array<string> | string {
    return this.value;
  }

  set innerValue(val: Array<string> | string) {
    this.$emit('input', val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .choice {
    display: flex;
    flex-direction: column;
  }
</style>
