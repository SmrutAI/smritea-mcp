
# AppAIConfigStatus


## Properties

Name | Type
------------ | -------------
`configured` | boolean
`embedding` | [AppAIProviderStatus](AppAIProviderStatus.md)
`llm` | [AppAIProviderStatus](AppAIProviderStatus.md)
`reranker` | [AppAIProviderStatus](AppAIProviderStatus.md)

## Example

```typescript
import type { AppAIConfigStatus } from ''

// TODO: Update the object below with actual values
const example = {
  "configured": null,
  "embedding": null,
  "llm": null,
  "reranker": null,
} satisfies AppAIConfigStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AppAIConfigStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


