import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'co-body'

async function bodyParse(ctx, next) {
  ctx.req.body = await bodyParser.json(ctx.req, { limit: '50mb' })
  await next()
}

class Server {
  constructor(config = {}) {
    this.port = config.port || 4000

    this.app = new Koa()

    this.initRouter()
    this.app.use(bodyParse)


    this.initRouter()
  }

  initRouter() {
    const router = new Router()

    router.get('/hello', (ctx) => {
      ctx.body = `hello ${new Date()}`
    })

    this.app
      .use(router.routes())
      .use(router.allowedMethods())
  }

  start() {
    this._server = this.app.listen(this.port)
  }

  stop() {
    if (this._server) {
      this._server.close()
    }
  }
}

export default Server
