<template>
  <form
    id="form"
    :method="formConfig.method"
    :action="formConfig.url"
  >
    <h1>Form Builder Prototype</h1>
    <div
      v-for="group in formConfig.groups"
      :key="group.gid"
      class="form__group"
    >
      <template
        v-for="field in group.fields"
      >
        <component
          :is="resolveComponent(field.type)"
          v-if="resolveCondition(field.condition)"
          :key="field.name"
          v-model="formData[field.name]"
          class="form__field"
          :question="field"
          @input="saveForm"
          @delete="deleteKey($event)"
        />
      </template>
    </div>
    <div class="form__buttons">
      <template
        v-for="button in formConfig.buttons"
      >
        <input
          :key="button.label"
          :type="button.type"
          :value="button.label"
        >
      </template>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import GenericInput from '@/components/GenericInput.vue';
import Choice from '@/components/Choice.vue';
import Dropdown from '@/components/Dropdown.vue';
import { Condition, FormConfig } from '@/types/FormConfig';

import formConfig from '@/assets/formConfig.json';

@Component({
  components: {
    GenericInput,
    Choice,
    Dropdown,
  },
})
export default class App extends Vue {
  @Mutation('mutateFormData') mutateFormData!: (formData: Record<string, string | number | Array<string | number>>) => void;

  private formData: Record<string, string | number | Array<string | number>> = {};

  // eslint-disable-next-line class-methods-use-this
  get formConfig(): FormConfig {
    return formConfig;
  }

  private saveForm(): void {
    this.mutateFormData(this.formData);
  }

  private resolveCondition(condition: Condition): boolean {
    if (condition) {
      const fieldValue = this.formData[condition.field] as string | Array<string>;
      switch (condition.condition) {
        case 'null':
          if (!fieldValue) {
            return true;
          }
          break;
        case 'not null':
          if (fieldValue) {
            return true;
          }
          break;
        case 'equals':
          if (fieldValue === condition.value) {
            return true;
          }
          break;
        case 'not equals':
          if (fieldValue !== condition.value) {
            return true;
          }
          break;
        case 'contains':
          if (fieldValue?.includes(condition.value as string)) {
            return true;
          }
          break;
        case 'not contain':
          if (!fieldValue?.includes(condition.value as string)) {
            return true;
          }
          break;
        default:
          return false;
      }
      return false;
    }
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveComponent(type: string): string {
    const map: Record<string, string> = {
      text: 'GenericInput',
      choice: 'Choice',
      date: 'GenericInput',
      'date-range': 'GenericInput',
      number: 'GenericInput',
      dropdown: 'Dropdown',
      range: 'GenericInput',
    };
    return map[type];
  }

  private deleteKey(key: string): void {
    delete this.formData[key];
    this.mutateFormData(this.formData);
  }
}
</script>

<style>
  #form {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  .form__group {
    display: flex;
  }
  .form__field {
    margin: 10px;
    min-width: 320px;
  }
</style>
