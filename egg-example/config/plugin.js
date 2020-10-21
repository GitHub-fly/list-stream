"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // {app_root}/config/plugin.js
  cors: {
    enable: true,
    package: "egg-cors",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
};
