MessagePack meets Brotli Compression
====================================

MessagePack with Brotli compression.

It is possible to reduce data size of redundant sources.

Brotli achieves very high compression ration but not so fast. This package will be helpful in case if you want smaller serialized data. (e.g. LocalStorage, Cookie, URL/Hashbang that includes data)

## Use

### Methods
- `static Msgpackz.serialize( Object )`
- `static Msgpackz.deserialize( Buffer )`
- `static Msgpackz.serializeToBase64( Object )`
- `static Msgpackz.deserializeFromBase64( String )`

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
// Output 1
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

// Output 2
G4oAAGTgnBtKhY4qD7KI8h/koNVg6XfKAXscRmGBHgC+HUjuMXaNpUQSLffZjO3s29Ge8fMPgC/z4JRl5tvFb1/4bed769WWW7DkJuiLjWTpF1kec3NcnoYYju+949u5yj3b3G6jF4R29NjEufR+d+2iiB07i9scQjYMigA=

// Output 3
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
Source: 179 bytes / msgpackz 125 bytes (binary) / 168 bytes (base64)
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
