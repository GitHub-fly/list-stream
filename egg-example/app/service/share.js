'use strict'

const Service = require('egg').Service

class ShareService extends Service {
    async isExist(sharedurl, options = {}) {
        let share = await this.app.model.Share.findOne({
            where: {
                sharedurl,
                iscancel: 0,
            },
            ...options,
        })

        if (!share) {
            return this.ctx.throw(404, '该分享已失效')
        }

        return share
    }
}

module.exports = ShareService
