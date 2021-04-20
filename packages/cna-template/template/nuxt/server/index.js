const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const {
    ChooNuxt,
} = require('@choo/choo-nuxt')

export default class Application extends ChooNuxt {
    app = new Koa()
    
    constructor (config) {
        super(config)
        this.action()
    }

    action = async () => {
        const {
            app,
            dev,
            nuxt,
            builder,
            host,
            port
        } = this

        if (dev) {
            await builder.build()
        } else {
            await nuxt.ready()
        }
        app.use(bodyParser())


        app.use(async (ctx) => {
            ctx.status = 200
            ctx.respond = false // Bypass Koa's built-in response handling
            ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
            nuxt.render(ctx.req, ctx.res)
        })

        app.listen(port, host)
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        })
    }
}