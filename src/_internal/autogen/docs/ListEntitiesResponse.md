
# ListEntitiesResponse


## Properties

Name | Type
------------ | -------------
`entities` | [Array&lt;EntityResponse&gt;](EntityResponse.md)
`limit` | number
`offset` | number
`totalCount` | number

## Example

```typescript
import type { ListEntitiesResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "entities": null,
  "limit": null,
  "offset": null,
  "totalCount": null,
} satisfies ListEntitiesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListEntitiesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


