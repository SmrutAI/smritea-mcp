
# CreateMemoryResult


## Properties

Name | Type
------------ | -------------
`explicitSkip` | boolean
`factsExtracted` | number
`memories` | [Array&lt;MemoryResponse&gt;](MemoryResponse.md)
`skippedCount` | number
`updatedCount` | number

## Example

```typescript
import type { CreateMemoryResult } from ''

// TODO: Update the object below with actual values
const example = {
  "explicitSkip": null,
  "factsExtracted": null,
  "memories": null,
  "skippedCount": null,
  "updatedCount": null,
} satisfies CreateMemoryResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateMemoryResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


