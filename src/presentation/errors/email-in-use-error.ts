export class EmailInUseError extends Error {
  constructor() {
    super('Received email is already in use')
    this.name = 'EmailInUseError'
  }
}
