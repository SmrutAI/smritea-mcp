
# SyncOutboxStatsResponse


## Properties

Name | Type
------------ | -------------
`completed` | number
`dead` | number
`pending` | number
`processing` | number

## Example

```typescript
import type { SyncOutboxStatsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "completed": null,
  "dead": null,
  "pending": null,
  "processing": null,
} satisfies SyncOutboxStatsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncOutboxStatsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


