import { Collection, MongoClient } from 'mongodb'

class _MongoHelper {
  public client: MongoClient
  private uri: string

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect(): Promise<void> {
    await this.client?.close()
    this.client = null
  }

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }

    return this.client?.db().collection(name) ?? null
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
