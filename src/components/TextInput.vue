<template>
  <div :class="`${question.type}-input`">
    <label>{{ question.label }}</label>
    <label>
      <textarea
        v-if="question.multiple_line"
        v-model="innerValue"
        :placeholder="question.placeholder"
      >
      </textarea>
      <template v-else>
        <input
          v-model="innerValue"
          :type="type"
          :placeholder="question.placeholder"
          :min="question.min"
          :max="maxConstraint"
        >
        <input
          v-if="question.type === 'date-range'"
          :type="type"
          :placeholder="question.placeholder"
          :min="question.min"
          :max="question.max"
        >
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Question } from '@/types/FormConfig';

@Component
export default class TextInput extends Vue {
  @Prop() private question!: Question;

  @Prop() private value!: string | number;

  get maxConstraint(): string | undefined {
    return this.question.type !== 'date-range' ? this.question.max : undefined;
  }

  get type(): string {
    return this.question.type !== 'date-range' ? this.question.type : 'date';
  }

  get innerValue(): string | number {
    return this.value;
  }

  set innerValue(val: string | number) {
    this.$emit('input', val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
