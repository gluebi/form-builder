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
            v-model="innerValue"
            :type="type"
            :name="question.name"
            :value="choice.value"
            :required="requiredStatus"
          >
          {{ choice.label }}
        </label>
      </template>
    </div>
    <p>{{ question.suffix_label }}</p>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import { Options, Vue } from 'vue-class-component';
import { Question } from '@/types/FormConfig';
import Tooltip from '@/components/Tooltip.vue';

@Options({
  name: 'Choice',
  components: {
    Tooltip,
  },
  emits: ['input'],
})
export default class Choice extends Vue {
  @Prop() private readonly question!: Question;

  @Prop({ default: () => [] }) private readonly modelValue!: Array<string> | string;

  get requiredStatus(): boolean | undefined {
    if (this.question.multiple_choice && this.innerValue.length) {
      return false;
    }
    return this.question.required;
  }

  get type(): string {
    return this.question.multiple_choice ? 'checkbox' : 'radio';
  }

  get innerValue(): Array<string> | string {
    return this.modelValue;
  }

  set innerValue(val: Array<string> | string) {
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
