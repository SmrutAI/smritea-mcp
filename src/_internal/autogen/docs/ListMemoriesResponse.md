
# ListMemoriesResponse


## Properties

Name | Type
------------ | -------------
`memories` | [Array&lt;MemoryResponse&gt;](MemoryResponse.md)
`totalCount` | number

## Example

```typescript
import type { ListMemoriesResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "memories": null,
  "totalCount": null,
} satisfies ListMemoriesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListMemoriesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


