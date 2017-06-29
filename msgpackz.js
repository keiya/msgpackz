"use strict";
const msgpack = require('msgpack-lite')
const pako = require('pako');
const b64buf = require('base64-arraybuffer')


const zlibOptions = {
  level: 9,
  memLevel: 9
}

class Msgpackz {
  static serialize(obj, _zlibOptions = zlibOptions) {
    const msgpackBuffer = msgpack.encode(obj)
    return pako.deflate(msgpackBuffer, _zlibOptions)
  }

  static deserialize(buffer) {
    const decompressedBuffer = pako.inflate(buffer)
    return msgpack.decode(decompressedBuffer)
  }

  static serializeToBase64(obj) {
    return b64buf.encode(this.serialize(obj))
  }

  static deserializeFromBase64(base64Str) {
    return this.deserialize(b64buf.decode(base64Str))
  }
}


module.exports = Msgpackz;
