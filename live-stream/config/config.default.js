'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {})

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1604217576839_2026'

    // add your middleware config here
    config.middleware = ['auth', 'errorHandler']

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    }

    // 这些断点的请求需要 token 鉴权
    config.auth = {
        match: ['/logout', '/upload', '/getSize', '/file', '/share'],
    }

    config.security = {
        // 关闭 csrf
        csrf: {
            enable: false,
        },
        // 跨域白名单
        domainWhiteList: ['http://localhost:3000'],
    }
    // 允许跨域的方法
    config.cors = {
        origin: '*',
        allowMethods: 'GET, PUT, POST, DELETE, PATCH',
    }

    return {
        ...config,
        ...userConfig,
    }
}
