import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  private readonly secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  encrypt(value: string): Promise<string> {
    return new Promise(resolve => {
      jwt.sign({ id: value }, this.secret)
      resolve(null)
    })
  }
}
