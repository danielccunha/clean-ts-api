import {
  Authentication,
  AuthenticationModel
} from '../../../domain/use-cases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth({ email }: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(email)
    return null
  }
}
