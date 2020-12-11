import jwt from 'jsonwebtoken'
import { Decrypter } from './../../../data/protocols/cryptography/decrypter'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async decrypt(value: string): Promise<string> {
    return new Promise(resolve => {
      const decryptedValue = jwt.verify(value, this.secret) as string
      resolve(decryptedValue)
    })
  }

  encrypt(value: string): Promise<string> {
    return new Promise(resolve => {
      const accessToken = jwt.sign({ id: value }, this.secret)
      resolve(accessToken)
    })
  }
}
