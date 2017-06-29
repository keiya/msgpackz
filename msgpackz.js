"use strict";
const brotli = require('brotli');
const msgpack = require("msgpack-lite")
const te = require("text-encoding")
const btoa = require("btoa")

class Msgpackz {
  static serialize(obj) {
    const msgpackBuffer = msgpack.encode(obj)
    if (msgpackBuffer.length < 23) {
      return msgpackBuffer
    }
    return brotli.compress(msgpackBuffer)
  }

  static deserialize(buffer) {
    let decompressedBuffer = null
    try {
      decompressedBuffer = brotli.decompress(buffer)
    }
    catch (e){}
    if (!decompressedBuffer || decompressedBuffer.length == 0) {
      return msgpack.decode(buffer)
    }
    return msgpack.decode(decompressedBuffer)
  }

  static serializeToBase64(obj) {
    const serialized = this.serialize(obj)
    if (serialized.constructor === Uint8Array) {
      const decoder = new te.TextDecoder('utf8')
      return btoa(decoder.decode(serialized))
    }
    return this.serialize(obj).toString('base64')
  }

  static deserializeFromBase64(base64Str) {

    return this.deserialize(Buffer.from(base64Str, 'base64'))
  }
}


module.exports = Msgpackz;
