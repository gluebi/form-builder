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
        v-model="innerValue"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Question } from '@/types/FormConfig';
import Tooltip from '@/components/Tooltip.vue';

@Component({
  components: {
    Tooltip,
  },
})
export default class Dropdown extends Vue {
  @Prop() private readonly question!: Question;

  @Prop(String) private readonly value!: string;

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
  .dropdown__label {
    display: flex;
  }
</style>
