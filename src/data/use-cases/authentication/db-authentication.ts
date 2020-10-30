import {
  Authentication,
  AuthenticationModel
} from '../../../domain/use-cases/authentication'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { TokenGenerator } from '../../protocols/cryptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth({ email, password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)

    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      )

      if (isValid) {
        return await this.tokenGenerator.generate(account.id)
      }
    }

    return null
  }
}
