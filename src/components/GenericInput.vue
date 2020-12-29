<template>
  <div
    class="input"
    :class="`${question.type}-input`"
  >
    <label class="input__label">{{ question.label }}
      <Tooltip
        class="input__tooltip"
        :text="question.help"
      />
    </label>
    <label>
      <textarea
        v-if="question.multiple_line && question.type === 'text'"
        v-model="value"
        :placeholder="question.placeholder"
        :minlength="question.min"
        :maxlength="question.max"
        :required="question.required"
      >
      </textarea>
      <template v-else>
        <input
          v-if="question.type !== 'date-range'"
          v-model="value"
          :type="type"
          :placeholder="question.placeholder"
          :min="question.min"
          :minlength="question.min"
          :max="question.max"
          :maxlength="question.max"
          :step="question.step"
          :required="question.required"
        >
        <template v-else>
          <input
            v-model="dateInput1"
            type="date"
            :placeholder="question.placeholder"
            :min="question.min"
            :max="question.max"
            :required="question.required"
          >
          <input
            v-model="dateInput2"
            type="date"
            :placeholder="question.placeholder"
            :min="question.min"
            :max="question.max"
            :required="question.required"
          >
        </template>
      </template>
    </label>
    <p v-if="question.suffix_label">{{ question.suffix_label }}</p>
    <p v-if="question.error">{{ question.error.message }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Question } from '@/types/FormConfig';
import Tooltip from '@/components/Tooltip.vue';

class Props {
  readonly question!: Question;

  readonly modelValue!: string | number;
}

// eslint-disable-next-line no-use-before-define
@Options<GenericInput>({
  name: 'GenericInput',
  components: {
    Tooltip,
  },
  emits: ['update:modelValue'],
  watch: {
    dateInput1() {
      if (this.dateInput1 !== '' && this.dateInput2 !== '') {
        const value = `${this.dateInput1}-${this.dateInput2}`;
        this.$emit('update:modelValue', value);
      }
    },
    dateInput2() {
      if (this.dateInput1 !== '' && this.dateInput2 !== '') {
        const value = `${this.dateInput1}-${this.dateInput2}`;
        this.$emit('update:modelValue', value);
      }
    },
    value(value: string) {
      if (this.question.type === 'date-range') {
        this.dateInput1 = value.substr(0, 10);
        this.dateInput2 = value.substr(11, 20);
      }
    },
  },
})
export default class GenericInput extends Vue.with(Props) {
  private dateInput1 = '';

  private dateInput2 = '';

  get type(): string {
    return this.question.type !== 'date-range' ? this.question.type : 'date';
  }

  get value(): string | number | undefined {
    if (this.question.type !== 'date-range') {
      return this.modelValue;
    }
    return undefined;
  }

  set value(val: string | number | undefined) {
    if (this.question.type !== 'date-range') {
      this.$emit('update:modelValue', val);
    }
  }

  beforeDestroy(): void {
    this.$emit('delete', this.question.name);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .input {
    display: flex;
    flex-direction: column;
  }
  .input__label {
    display: flex;
  }
</style>
