<template>
  <form
    id="form"
    :method="formConfig.method"
    :action="formConfig.url"
  >
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
          :key="field.name"
          v-model="formData[field.id]"
          class="form__field"
          :question="field"
          @input="saveForm"
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
import TextInput from '@/components/TextInput.vue';
import Choice from '@/components/Choice.vue';
import { FormConfig, Group, Question } from '@/types/FormConfig';

import formConfig from '@/assets/formConfig.json';

@Component({
  components: {
    TextInput,
    Choice,
  },
})
export default class App extends Vue {
  @Mutation('mutateFormData') mutateFormData!: (formData: Array<string | number | Array<string | number>>) => void;

  formData: Array<string | number | Array<string | number>> = [];

  // eslint-disable-next-line class-methods-use-this
  get formConfig(): FormConfig {
    let fIndex = 0;
    formConfig.groups.forEach((group: Group, gIndex: number) => {
      // eslint-disable-next-line no-param-reassign
      group.gid = gIndex;
      group.fields.forEach((field: Question) => {
        // eslint-disable-next-line no-param-reassign
        field.id = fIndex;
        fIndex += 1;
      });
    });
    return formConfig;
  }

  saveForm(): void {
    this.mutateFormData(this.formData);
  }

  // eslint-disable-next-line class-methods-use-this
  resolveComponent(type: string): string {
    const map: Record<string, string> = {
      text: 'TextInput',
      choice: 'Choice',
      date: 'TextInput',
      'date-range': 'TextInput',
      number: 'TextInput',
    };
    return map[type];
  }
}
</script>

<style>
#form {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form__group {
  display: flex;
}
</style>
