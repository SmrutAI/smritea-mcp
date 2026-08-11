
# DomainSchemaResponse


## Properties

Name | Type
------------ | -------------
`classificationSchema` | { [key: string]: string; }
`relationshipSchema` | [Array&lt;RelationshipType&gt;](RelationshipType.md)

## Example

```typescript
import type { DomainSchemaResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "classificationSchema": null,
  "relationshipSchema": null,
} satisfies DomainSchemaResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DomainSchemaResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


