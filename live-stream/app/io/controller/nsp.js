'use strict'

const Controller = require('egg').Controller

class NspController extends Controller {
    async test() {
        const { ctx, app } = this
        // 前端传过来的参数
        let message = ctx.args[0]
        console.log(message)

        // 当前的 socket 连接
        const socket = ctx.socket
        // 获取 socket 的 id
        const id = socket.id
        // 向这个 socket 发送消息
        socket.emit(id, '来自后端的消息')
    }
}
module.exports = NspController
