// used to convert the raw json into encoded form

const crypto = require("crypto");

const generateCachedKey = (prefix, payload) => {
  const hash = crypto
    .createHash("md5")
    .update(JSON.stringify(payload))
    .digest("hex");

  return `${prefix}:${hash}`;
};

module.exports = generateCachedKey