
# SearchConfig


## Properties

Name | Type
------------ | -------------
`enableAutoSelect` | boolean
`entityExtraction` | [EntityExtractionConfig](EntityExtractionConfig.md)
`graphOptions` | [GraphSearchOptions](GraphSearchOptions.md)
`maxResults` | number
`memoryStorageEngine` | string
`methodWeights` | [MethodWeights](MethodWeights.md)
`reranker` | [RerankerOptions](RerankerOptions.md)
`sourceWeights` | [SourceWeightsConfig](SourceWeightsConfig.md)
`temporalDecay` | [TemporalDecayConfig](TemporalDecayConfig.md)
`temporalFilter` | [TemporalFilter](TemporalFilter.md)
`version` | number

## Example

```typescript
import type { SearchConfig } from ''

// TODO: Update the object below with actual values
const example = {
  "enableAutoSelect": null,
  "entityExtraction": null,
  "graphOptions": null,
  "maxResults": null,
  "memoryStorageEngine": null,
  "methodWeights": null,
  "reranker": null,
  "sourceWeights": null,
  "temporalDecay": null,
  "temporalFilter": null,
  "version": null,
} satisfies SearchConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


