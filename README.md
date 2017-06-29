MessagePack meets Brotli Compression
====================================

## Use

### Serialize to Buffer, Deserialize from Buffer

```js
const Msgpackz = require('msgpackz');

const serialized = Msgpackz.serialize(sourceObject)
const deserialized = Msgpackz.deserialize(serialized)
```

### Serialize to String, Deserialize from String

```js
const Msgpackz = require('msgpackz');

serializedB64 = Msgpackz.serializeToBase64(samples[i])
deserialized = Msgpackz.deserializeFromBase64(serializedB64)
```

## Benchmark

### Sample dataset

```js
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
```

### Result

```
  Object round-trip
27bytes => 18bytes
    ✓ samples[0] roundtrip
21bytes => 13bytes
    ✓ samples[1] roundtrip
360bytes => 207bytes
    ✓ samples[2] roundtrip (41ms)
379bytes => 84bytes
    ✓ samples[3] roundtrip

  Object base64 round-trip
27bytes => 24bytes
    ✓ samples[0] roundtrip
21bytes => 20bytes
    ✓ samples[1] roundtrip
360bytes => 276bytes
    ✓ samples[2] roundtrip
379bytes => 112bytes
    ✓ samples[3] roundtrip
```
