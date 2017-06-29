const assert = require('assert')
const Msgpackz = require('../msgpackz.js');
const samples = [
  {"compact":true,"schema":0},
  [ 100, 500, 300, 200, 400 ],
  {
      "glossary": {
          "title": "example glossary",
  		"GlossDiv": {
              "title": "S",
  			"GlossList": {
                  "GlossEntry": {
                      "ID": "SGML",
  					"SortAs": "SGML",
  					"GlossTerm": "Standard Generalized Markup Language",
  					"Acronym": "SGML",
  					"Abbrev": "ISO 8879:1986",
  					"GlossDef": {
                          "para": "A meta-markup language, used to create markup languages such as DocBook.",
  						"GlossSeeAlso": ["GML", "XML"]
                      },
  					"GlossSee": "markup"
                  }
              }
          }
      }
  },
  {
    "nested1": {
      "nested2": {
        "nested3": {
          "nested4": {
            "nested5": { "value": 9999999999999 },
            "redundant1": { "value": 9999999999999 },
            "redundant2": { "value": 9999999999999 },
            "redundant3": { "value": 9999999999999 },
            "redundant4": { "value": 9999999999999 },
            "redundant5": { "value": 9999999999999 },
            "redundant6": { "value": 9999999999999 },
            "redundant7": { "value": 9999999999999 },
            "redundant8": { "value": 9999999999999 }
          },
        },
      },
    }
  }
]

describe( 'Short object round-trip', () => {
  for (let len = 0; len < 30; len++) {
    it( len + 'bytes roundtrip', () => {
      const sampleObj = "012345678901234567890123456789".slice(0,len)

      const serialized = Msgpackz.serialize(sampleObj)
      const deserialized = Msgpackz.deserialize(serialized)
      assert(sampleObj === deserialized)
    } );
  }
} );


describe( 'Short object base64 round-trip', () => {
  for (let len = 0; len < 30; len++) {
    it( len + 'bytes roundtrip', () => {
      const sampleObj = "012345678901234567890123456789".slice(0,len)

      const serializedB64 = Msgpackz.serializeToBase64(sampleObj)
      const deserialized = Msgpackz.deserializeFromBase64(serializedB64)
      assert(sampleObj === deserialized)
    } );
  }
} );

describe( 'Object round-trip', () => {
  for (let i = 0; i < samples.length; i++) {
    it( 'samples[' + i + '] roundtrip', () => {
       serialized = Msgpackz.serialize(samples[i])
       deserialized = Msgpackz.deserialize(serialized)
      // console.log(JSON.stringify(samples[i]).length + 'bytes => ' + serialized.length + 'bytes')
      assert(JSON.stringify(samples[i]) == JSON.stringify(deserialized))
    } );
  }
} );

describe( 'Object base64 round-trip', () => {
  for (let i = 0; i < samples.length; i++) {
    it( 'samples[' + i + '] roundtrip', () => {
      serializedB64 = Msgpackz.serializeToBase64(samples[i])
      deserialized = Msgpackz.deserializeFromBase64(serializedB64)
      
      // console.log(JSON.stringify(samples[i]).length + 'bytes => ' + serialized.length + 'bytes')
      assert(JSON.stringify(samples[i]) == JSON.stringify(deserialized))
    } );
  }
} );
