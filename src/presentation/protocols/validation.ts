export interface Validation<TInput = any> {
  validate(input: TInput): Error
}
