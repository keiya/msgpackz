"use strict";
const brotli = require('brotli');
const msgpack = require("msgpack-lite")
const te = require("text-encoding")
const btoa = require("btoa")

class Msgpackz {
  static serialize(obj) {
    const msgpackBuffer = msgpack.encode(obj)
    let buffer = null
    if (msgpackBuffer.length < 23) {
      buffer = msgpackBuffer
    }
    else {
      buffer = brotli.compress(msgpackBuffer)
    }

    if (buffer.constructor === Uint8Array) {
      return new Buffer( buffer );
    }
    return buffer
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
    return this.serialize(obj).toString('base64')
  }

  static deserializeFromBase64(base64Str) {

    return this.deserialize(Buffer.from(base64Str, 'base64'))
  }
}


module.exports = Msgpackz;
