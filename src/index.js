import request from 'request'
import { EventEmitter } from 'events'

export default class Monitor extends EventEmitter {
  constructor(url, opts = {}) {
    super()

    this.url = url
    this.interval = opts.interval || 2000
    this.current = null
    this.active = false
  }

  async run() {
    if (this.active) {
      const self = this
      setTimeout(async () => {
        const content = await self.fetchPage()
        if (content !== self.current) {
          self.emit('update', this.current, content)
          self.current = content
        } else {
          self.emit('noupdate', content)
        }

        await self.run()
      }, this.interval)
    }
  }

  async start() {
    this.active = true
    await this.run()
  }

  async stop() {
    this.active = false
  }

  async fetchPage() {
    return new Promise((resolve, reject) => {
      request(this.url, (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  }
}
