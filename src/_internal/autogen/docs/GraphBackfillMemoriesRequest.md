
# GraphBackfillMemoriesRequest

Graph backfill from memories request payload

## Properties

Name | Type
------------ | -------------
`appId` | string
`maxPasses` | number
`memoryIds` | Array&lt;string&gt;

## Example

```typescript
import type { GraphBackfillMemoriesRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "maxPasses": null,
  "memoryIds": null,
} satisfies GraphBackfillMemoriesRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GraphBackfillMemoriesRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


