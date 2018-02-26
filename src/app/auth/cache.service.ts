export abstract class CacheService {
  protected getStringItem(key: string) {
    return localStorage.getItem(key)
  }

  protected getItem<T>(key: string): T {
    let data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  protected setItem(key: string, data: object | string) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data)
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  protected removeItem(key: string) {
    localStorage.removeItem(key)
  }

  protected clear() {
    localStorage.clear()
  }
}
