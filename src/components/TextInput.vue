<template>
  <div
    class="input"
    :class="`${question.type}-input`"
  >
    <label>{{ question.label }}</label>
    <label>
      <textarea
        v-if="question.multiple_line"
        v-model="innerValue"
        :placeholder="question.placeholder"
        :minlength="question.min"
        :maxlength="question.max"
        :required="question.required"
      >
      </textarea>
      <template v-else>
        <input
          v-if="question.type !== 'date-range'"
          v-model="innerValue"
          :type="type"
          :placeholder="question.placeholder"
          :min="question.min"
          :minlength="question.min"
          :max="question.max"
          :maxlength="question.max"
          :required="question.required"
        >
        <template v-else>
          <input
            v-model="input1"
            type="date"
            :placeholder="question.placeholder"
            :min="question.min"
            :max="question.max"
            :required="question.required"
          >
          <input
            v-model="input2"
            type="date"
            :placeholder="question.placeholder"
            :min="question.min"
            :max="question.max"
            :required="question.required"
          >
        </template>
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { Question } from '@/types/FormConfig';

@Component
export default class TextInput extends Vue {
  @Prop() private question!: Question;

  @Prop() private value!: string | number;

  @Watch('input1')
  @Watch('input2')
  private onInputChange() {
    if (this.input1 !== '' && this.input2 !== '') {
      const value = `${this.input1}-${this.input2}`;
      this.$emit('input', value);
    }
  }

  @Watch('value')
  private onValueChange(value: string) {
    if (this.question.type === 'date-range') {
      this.input1 = value.substr(0, 10);
      this.input2 = value.substr(11, 20);
    }
  }

  input1 = '';

  input2 = '';

  get type(): string {
    return this.question.type !== 'date-range' ? this.question.type : 'date';
  }

  get innerValue(): string | number | undefined {
    if (this.question.type !== 'date-range') {
      return this.value;
    }
    return undefined;
  }

  set innerValue(val: string | number | undefined) {
    if (this.question.type !== 'date-range') {
      this.$emit('input', val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .input {
    display: flex;
    flex-direction: column;
  }
</style>
