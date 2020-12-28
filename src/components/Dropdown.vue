<template>
  <div class="dropdown">
    <label class="dropdown__label">{{ question.label }}
      <Tooltip
        class="input__tooltip"
        :text="question.help"
      />
    </label>
    <label>
      <select
        v-model="value"
        :placeholder="question.placeholder"
        :required="question.required"
      >
        <option
          selected
          disabled
          value
        >{{ question.default }}</option>
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
import { Options, Vue } from 'vue-class-component';
import { Question } from '@/types/FormConfig';
import Tooltip from '@/components/Tooltip.vue';

class Props {
  readonly question!: Question;

  readonly modelValue!: string;
}

@Options({
  name: 'Dropdown',
  components: {
    Tooltip,
  },
  emits: ['update:modelValue', 'delete'],
})
export default class Dropdown extends Vue.with(Props) {
  get value(): string {
    return this.modelValue;
  }

  set value(val: string) {
    if (val === this.question.placeholder) {
      this.$emit('update:modelValue', undefined);
    } else {
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
  .dropdown {
    display: flex;
    flex-direction: column;
  }
  .dropdown__label {
    display: flex;
  }
</style>
