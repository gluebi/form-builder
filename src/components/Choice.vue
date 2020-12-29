<template>
  <div class="choice">
    <label class="choice__label">{{ question.label }}
      <Tooltip
        class="input__tooltip"
        :text="question.help"
      />
    </label>
    <div class="choice__choices-container">
      <template
        v-for="choice in question.choices"
        :key="choice.value"
      >
        <label>
          <input
            v-model="value"
            :type="type"
            :name="question.name"
            :value="choice.value"
            :required="requiredStatus"
          >
          {{ choice.label }}
        </label>
      </template>
    </div>
    <p v-if="question.suffix_label">{{ question.suffix_label }}</p>
    <p v-if="question.error">{{ question.error.message }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';
import { Question } from '@/types/FormConfig';
import Tooltip from '@/components/Tooltip.vue';

class Props {
  readonly question!: Question;

  readonly modelValue = prop<Array<string> | string>({ default: [] });
}

@Options({
  name: 'Choice',
  components: {
    Tooltip,
  },
  emits: ['update:modelValue'],
})
export default class Choice extends Vue.with(Props) {
  get requiredStatus(): boolean | undefined {
    if (this.question.multiple_choice && this.value?.length) {
      return false;
    }
    return this.question.required;
  }

  get type(): string {
    return this.question.multiple_choice ? 'checkbox' : 'radio';
  }

  get value(): Array<string> | string {
    return this.modelValue;
  }

  set value(val: Array<string> | string) {
    this.$emit('update:modelValue', val);
  }

  beforeDestroy(): void {
    this.$emit('delete', this.question.name);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .choice {
    display: flex;
    flex-direction: column;
  }
  .choice__label {
    display: flex;
  }
</style>
