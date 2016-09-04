Page Monitor
==========

A small module that monitor page update

## Installation

  `npm install page-monitor`

## Usage

  import Monitor from 'page-monitor'

  const monitor = new Monitor('http://www.example.com', { interval: 1000 })

  monitor.on('update', (previous, current) => {
    console.log(previous, current)
  })

  monitor.on('noupdate', (current) => {
    console.log(current)
  })

  monitor.run()

  monitor.stop()

## Tests

  `npm test`

## Contributing

  Happy to gain any helpful contribution. Github: https://github.com/pplam/page_monitor.
