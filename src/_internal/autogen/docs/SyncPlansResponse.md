
# SyncPlansResponse


## Properties

Name | Type
------------ | -------------
`errors` | Array&lt;string&gt;
`skipped` | number
`synced` | [Array&lt;SyncedPlanEntry&gt;](SyncedPlanEntry.md)

## Example

```typescript
import type { SyncPlansResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "errors": null,
  "skipped": null,
  "synced": null,
} satisfies SyncPlansResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncPlansResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


