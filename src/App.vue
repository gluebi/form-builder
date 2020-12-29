<template>
  <form
    id="form"
    :method="formConfig.method"
    :action="formConfig.url"
  >
    <h1>Form Builder Prototype</h1>
    <div
      v-for="(group, index) in formConfig.groups"
      :key="index"
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
        :key="button.label"
      >
        <input
          :type="button.type"
          :value="button.label"
          @click.prevent="onButtonClick(button.type, button.confirmation)"
        >
        <Modal
          v-if="button.confirmation"
          :button="button"
          :show="showModal"
          @close="showModal = ''"
          @action="onButtonClick(button.type, false)"
        />
      </template>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Mutation } from 'vuex-class';
import GenericInput from '@/components/GenericInput.vue';
import Choice from '@/components/Choice.vue';
import Dropdown from '@/components/Dropdown.vue';
import Modal from '@/components/Modal.vue';
import { Condition, FormConfig } from '@/types/FormConfig';

import formConfig from '@/assets/formConfig.json';

@Options({
  name: 'Form Builder',
  components: {
    GenericInput,
    Choice,
    Dropdown,
    Modal,
  },
})
export default class App extends Vue {
  @Mutation('mutateFormData') mutateFormData!: (formData: Record<string, string | number | Array<string | number>>) => void;

  private formData: Record<string, string | number | Array<string | number>> = {};

  private showModal = '';

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

  private onButtonClick(buttonType: string, confirmation: boolean): void {
    switch (buttonType) {
      case 'submit':
        if (confirmation) {
          this.showModal = `show-${buttonType}`;
        } else {
          this.submit();
        }
        break;
      default:
        break;
    }
  }

  private submit(): void {
    this.showModal = '';
    console.log('submitted');
  }
}
</script>

<style>
  body {
    box-sizing: border-box;
    margin: 0;
  }
  #form {
    box-sizing: border-box;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 20px;
  }
  .form__group {
    display: flex;
  }
  .form__field {
    margin: 10px;
    min-width: 320px;
  }
</style>
