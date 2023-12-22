import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public getItem<T>(key: string, hydrator?: (data: never) => T): T | null {
    const data = localStorage.getItem(key)

    if (data !== 'undefined' && data !== null) {
      const parsedData = JSON.parse(data) as never
      return hydrator ? hydrator(parsedData) : parsedData
    }
    return null
  }

  public setItem(key: string, data: object | string) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data)
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  public removeItem(key: string) {
    localStorage.removeItem(key)
  }

  public clear() {
    localStorage.clear()
  }
}
