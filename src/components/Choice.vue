<template>
  <div class="choice">
    <label>{{ question.label }}
      <span class="choice__icon">&#9432;
        <Tooltip
          class="choice__tooltip"
          :text="question.help"
        />
      </span>
    </label>
    <div class="choice__choices-container">
      <template v-for="choice in question.choices">
        <label :key="choice.value">
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Question } from '@/types/FormConfig';
import Tooltip from '@/components/Tooltip.vue';

@Component({
  components: {
    Tooltip,
  },
})
export default class Choice extends Vue {
  @Prop() private readonly question!: Question;

  @Prop({ default: () => [] }) private readonly value!: Array<string> | string;

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
    return this.value;
  }

  set innerValue(val: Array<string> | string) {
    this.$emit('input', val);
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
  .choice__icon {
    cursor: pointer;
    position: relative;
    display: inline-block;
  }
  .choice__icon:hover .tooltip__text {
    visibility: visible;
    opacity: 1;
  }
</style>
