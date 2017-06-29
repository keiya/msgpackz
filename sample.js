const Msgpackz = require('./msgpackz.js');

const sourceObject = {
  "string": "yeah",
  "number": 114514,
  "boolean": true,
  "nested": [
     {
       "GTA5": "fun",
       "KSP": "interesting",
       "factorio": "very hard",
       "beamNG": "smash every cars",
       "rimworld": "cannibalism..."
     },
     "810"
   ]
}
const serialized = Msgpackz.serialize(sourceObject)
let deserialized = Msgpackz.deserialize(serialized)
console.log(JSON.stringify(deserialized, null, 2))

const serializedB64 = Msgpackz.serializeToBase64(sourceObject)
console.log(serializedB64)
deserialized = Msgpackz.deserializeFromBase64(serializedB64)
console.log(JSON.stringify(deserialized, null, 2))
