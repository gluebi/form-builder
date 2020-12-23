<template>
  <div class="dropdown">
    <label>{{ question.label }}
      <span class="dropdown__icon">&#9432;
        <Tooltip
          class="dropdown__tooltip"
          :text="question.help"
        />
      </span>
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
  .dropdown__icon {
    cursor: pointer;
    position: relative;
    display: inline-block;
  }
  .dropdown__icon:hover .tooltip__text {
    visibility: visible;
    opacity: 1;
  }
</style>
