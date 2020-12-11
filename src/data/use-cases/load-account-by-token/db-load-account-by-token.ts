import { LoadAccountByTokenRepository } from './../../protocols/db/account/load-account-by-token-repository'
import { Decrypter } from './../../protocols/cryptography/decrypter'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from './../../../domain/use-cases/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) {
      return null
    }

    return await this.loadAccountByTokenRepository.loadByToken(
      accessToken,
      role
    )
  }
}
