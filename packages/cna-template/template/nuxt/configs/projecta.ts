export default {
    server () {
        let host: string
        let port: number
        switch (process.env.CHOO_ENV) {
            case 'test':
                host = '0.0.0.0'
                port = 5000
                break
            case 'prepub':
                host = '0.0.0.0'
                port = 5001
                break
            case 'production':
                host = '0.0.0.0'
                port = 5002
                break
            default:
                host = '0.0.0.0'
                port = 3000
        }
        return {
            host,
            port
        }
    }
}