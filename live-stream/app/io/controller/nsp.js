'use strict'

const Controller = require('egg').Controller

class NspController extends Controller {
    async test() {
        const { ctx, app } = this
        // 前端传过来的参数
        let message = ctx.args[0]
        console.log(message)
    }
}
module.exports = NspController
