
# RelationshipOutputDTO

Extracted relationship output

## Properties

Name | Type
------------ | -------------
`created` | boolean
`id` | string
`sourceEntityId` | string
`targetEntityId` | string
`type` | string

## Example

```typescript
import type { RelationshipOutputDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "created": null,
  "id": null,
  "sourceEntityId": null,
  "targetEntityId": null,
  "type": null,
} satisfies RelationshipOutputDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RelationshipOutputDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


