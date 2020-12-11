import { Decrypter } from './../../protocols/cryptography/decrypter'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from './../../../domain/use-cases/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
