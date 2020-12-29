declare interface Constraint {
  message: string;
  property: string;
  // eslint-disable-next-line camelcase
  invalid_value: string;
}

declare interface Error {
  code?: string;
  detail: string;
  constraint: Constraint;
}

declare interface ErrorResponse {
  status: number;
  body: Array<unknown>,
  errors: Array<Error>;
}

export {
  ErrorResponse,
  Error,
  Constraint,
};
