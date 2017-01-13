Page Update Monitor
==========

Monitoring page updates for given url, no dependency

## Installation

  `npm install page-update-monitor`

## Usage

~~~javascript
import Monitor from 'page-update-monitor'

const delay = (ms) => {
  return new Promise(r => setTimeout(() => r(), ms))
}

(async () => {
  const url = 'https://news.ycombinator.com/'  // The target page to be monitored
  const interval = 1000  // The interval(in ms) of the monitor instance to check the target page
  const monitor = new Monitor(url, { interval })

  // Remember to run it before set event handle
  await monitor.start()

  // Emitted when page updates, with page's previous and current contents
  monitor.on('update', (previous, current) => {
    console.log(previous, current)
  })

  // Emitted when page doesn't update, with page's current content
  monitor.on('noupdate', (current) => {
    console.log(current)
  })

  await delay(5000)
  await monitor.stop()
})()
~~~

## Contributing

  Happy to get any helpful contribution. Here is the code, wish it's useful to you: https://github.com/pplam/page_monitor.
