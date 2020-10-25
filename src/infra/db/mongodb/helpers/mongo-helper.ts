import { Collection, MongoClient } from 'mongodb'

class _MongoHelper {
  public client: MongoClient

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect(): Promise<void> {
    await this.client?.close()
  }

  getCollection(name: string): Collection {
    return this.client?.db().collection(name)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map<TData = any>({ _id: id, ...entity }: any): TData {
    return {
      id,
      ...entity
    }
  }
}

export const MongoHelper = new _MongoHelper()
