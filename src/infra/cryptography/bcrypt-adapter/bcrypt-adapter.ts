import bcrypt from 'bcrypt'
import { HashComparer } from '../../../data/protocols/cryptography/hash-comparer'

import { Hasher } from '../../../data/protocols/cryptography/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
