import request from 'request'
import { EventEmitter } from 'events'

export default class Monitor extends EventEmitter {
  constructor(url, opts = {}) {
    super()

    this.url = url
    this.interval = opts.interval || 2000
    this.current = null
    this.stopped = false
  }

  async run() {
    await this.monitor()
  }

  async monitor() {
    if (!this.stopped) {
      const self = this
      setTimeout(async () => {
        const content = await self.fetchPage()
        if (content !== self.current) {
          self.emit('update', this.current, content)
          self.current = content
        } else {
          self.emit('noupdate', content)
        }

        self.monitor()
      }, this.interval)
    }
  }

  async start() {
    this.stopped = false
  }

  async stop() {
    this.stopped = true
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
