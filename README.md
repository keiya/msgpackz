MessagePack meets Zlib Compression
==================================

MessagePack with Zlib compression.

It is possible to reduce data size of redundant sources.

Zlib achieves high compression ratio but not so fast. This package will be helpful in case if you want smaller serialized data. (e.g. LocalStorage, Cookie, URL/Hashbang that includes data)

## Use

### Methods
- `static Msgpackz.serialize( obj : Object [, zlibOptions : Object] ) : Uint8Array`
- `static Msgpackz.deserialize( buffer: Uint8Array ) : Object`
- `static Msgpackz.serializeToBase64( obj : Object ) : String`
- `static Msgpackz.deserializeFromBase64( base64Str : String ) : Object`

### Sample

```js
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
console.log(JSON.stringify(deserialized, null, 2)) // Output 1

const serializedB64 = Msgpackz.serializeToBase64(sourceObject)
console.log(serializedB64) // Output 2
deserialized = Msgpackz.deserializeFromBase64(serializedB64)
console.log(JSON.stringify(deserialized, null, 2)) // Output 3

// Output 4
console.log('Source: ' + JSON.stringify(sourceObject).length +
  ' bytes / msgpackz ' + serialized.length + ' bytes (binary) / ' +
  serializedB64.length + ' bytes (base64)'
)
```

```
{
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
eNprWVZcUpSZl76kMjUxY1leaW5SatE5Bsb9QcuT8vNzUhPzDi/LSy0uSU2Z1LrEPcTRdHFaad5i7+CA1Zl5JalFQBmg3hVpickl+UWZ+SvLUosqFTISi1KWJaUm5vq5byjOTSzOUEgFiycnFhWvKMrMLc8vyklZl5yYl5eZlJiTWZyrp6e32MLQAAC/NzsZ
{
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
Source: 179 bytes / msgpackz 144 bytes (binary) / 192 bytes (base64)
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
27bytes => 26bytes
    ✓ samples[0] roundtrip
21bytes => 22bytes
    ✓ samples[1] roundtrip
360bytes => 231bytes
    ✓ samples[2] roundtrip
379bytes => 81bytes
    ✓ samples[3] roundtrip

  Object base64 round-trip
27bytes => 36bytes
    ✓ samples[0] roundtrip
21bytes => 32bytes
    ✓ samples[1] roundtrip
360bytes => 308bytes
    ✓ samples[2] roundtrip
379bytes => 108bytes
    ✓ samples[3] roundtrip
```
