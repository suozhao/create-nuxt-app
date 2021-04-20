import Koa, { Context } from 'koa'
import consola from 'consola'
import bodyParser from 'koa-bodyparser'
import {
    ChooNuxt,
    ChooNuxtConfig
} from '@choo/choo-nuxt'

export default class Application extends ChooNuxt {
    private app: Koa = new Koa()
    
    constructor (config: ChooNuxtConfig) {
        super(config)
        this.action()
    }

    private action: () => Promise<void> = async () => {
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