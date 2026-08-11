
# SyncOutboxListResponse


## Properties

Name | Type
------------ | -------------
`entries` | [Array&lt;SyncOutboxEntryResponse&gt;](SyncOutboxEntryResponse.md)
`page` | number
`pageSize` | number
`total` | number

## Example

```typescript
import type { SyncOutboxListResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "entries": null,
  "page": null,
  "pageSize": null,
  "total": null,
} satisfies SyncOutboxListResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncOutboxListResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


