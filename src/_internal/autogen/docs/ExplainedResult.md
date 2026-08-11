
# ExplainedResult


## Properties

Name | Type
------------ | -------------
`content` | string
`explanation` | [ResultExplanation](ResultExplanation.md)
`finalScore` | number
`memoryId` | string

## Example

```typescript
import type { ExplainedResult } from ''

// TODO: Update the object below with actual values
const example = {
  "content": null,
  "explanation": null,
  "finalScore": null,
  "memoryId": null,
} satisfies ExplainedResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExplainedResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


