declare interface Button {
  label: string;
  type: string;
  confirmation: boolean;
  // eslint-disable-next-line camelcase
  confirmation_message: string;
}

declare interface Condition {
  field: string;
  condition: string;
  value?: string | number;
}

declare interface Choice {
  value: string | number;
  label: string;
}

declare interface Question {
  name: string;
  label: string;
  // eslint-disable-next-line camelcase
  suffix_label?: string;
  type: string;
  required?: boolean;
  placeholder?: string | number;
  choices?: Array<Choice>;
  default?: string | number;
  // eslint-disable-next-line camelcase
  multiple_line?: boolean;
  // eslint-disable-next-line camelcase
  multiple_choice?: boolean;
  min?: string | number;
  max?: string | number;
  step?: number;
  help?: string;
  condition?: Condition;
}

declare interface Group {
  fields: Array<Question>;
}

declare interface FormConfig {
  name: string;
  url: string;
  method: string;
  buttons: Array<Button>;
  groups: Array<Group>;
}

export {
  FormConfig,
  Group,
  Question,
  Choice,
  Condition,
  Button,
};
