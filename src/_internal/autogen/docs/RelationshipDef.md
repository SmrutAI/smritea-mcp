
# RelationshipDef


## Properties

Name | Type
------------ | -------------
`description` | string
`from` | string
`generateReverse` | boolean
`generateSynonyms` | boolean
`queryExpansion` | boolean
`reverseType` | string
`to` | string
`type` | string

## Example

```typescript
import type { RelationshipDef } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "from": null,
  "generateReverse": null,
  "generateSynonyms": null,
  "queryExpansion": null,
  "reverseType": null,
  "to": null,
  "type": null,
} satisfies RelationshipDef

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RelationshipDef
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


