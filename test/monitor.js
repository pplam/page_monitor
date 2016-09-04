import { expect } from 'chai'
import Server from '../lib/server/app'
import Monitor from '../lib/monitor'

const config = {
  port: 4000,
}

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

describe('Monitor', () => {
  const server = new Server(config)

  before(() => {
    server.start()
  })

  after(() => {
    server.stop()
  })

  it('should monitor page change', async () => {
    const url = `http://localhost:${config.port}/hello`
    const monitor = new Monitor(url, { interval: 1000 })
    let error = null
    try {
      await monitor.run()
    } catch (e) {
      error = e
    }

    expect(error).to.equal(null)

    let updated = 0
    monitor.on('update', () => {
      updated += 1
    })

    let noupdated = 0
    monitor.on('noupdate', () => {
      noupdated += 1
    })

    await delay(4100)
    expect(updated).to.equal(4)
    expect(noupdated).to.equal(0)
  })
})
