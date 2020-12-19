declare interface Button {
  label: string,
  type: string,
  confirmation: boolean,
  // eslint-disable-next-line camelcase
  confirmation_message: string,
}

declare interface Condition {
  field: string,
  value: string,
}

declare interface Choice {
  value: string,
  label: string,
}

declare interface Question {
  id: number,
  name: string,
  label: string,
  // eslint-disable-next-line camelcase
  suffix_label: string,
  type: string,
  required: boolean,
  placeholder: string,
  choices: Array<Choice>,
  default: string,
  // eslint-disable-next-line camelcase
  multiple_line: boolean,
  // eslint-disable-next-line camelcase
  multiple_choice: boolean,
  min: string,
  max: string,
  help: string,
  condition: Condition,
}

declare interface Group {
  gid: number,
  fields: Array<Question>,
}

declare interface FormConfig {
  name: string,
  url: string,
  method: string,
  buttons: Array<Button>,
  groups: Array<Group>,
}

export {
  FormConfig,
  Group,
  Question,
  Choice,
  Condition,
  Button,
};
