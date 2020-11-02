import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  encrypt(value: string): Promise<string> {
    return new Promise(resolve => {
      const accessToken = jwt.sign({ id: value }, this.secret)
      resolve(accessToken)
    })
  }
}
