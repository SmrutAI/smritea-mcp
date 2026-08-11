
# GraphBackfillMemoriesResponse

Graph backfill from memories response

## Properties

Name | Type
------------ | -------------
`errors` | [Array&lt;BatchItemErrorDTO&gt;](BatchItemErrorDTO.md)
`results` | [Array&lt;MemoryExtractionResultDTO&gt;](MemoryExtractionResultDTO.md)
`summary` | [GraphBackfillMemorySummaryDTO](GraphBackfillMemorySummaryDTO.md)

## Example

```typescript
import type { GraphBackfillMemoriesResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "errors": null,
  "results": null,
  "summary": null,
} satisfies GraphBackfillMemoriesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GraphBackfillMemoriesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


