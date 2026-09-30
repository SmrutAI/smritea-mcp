
# UpdateSearchConfigRequest


## Properties

Name | Type
------------ | -------------
`defaultMethod` | string
`enableAutoSelect` | boolean
`graphOptions` | [GraphSearchOptions](GraphSearchOptions.md)
`methodWeights` | [MethodWeights](MethodWeights.md)
`reranker` | [RerankerOptions](RerankerOptions.md)
`sourceWeights` | [SourceWeightsConfig](SourceWeightsConfig.md)
`temporalDecay` | [TemporalDecayConfig](TemporalDecayConfig.md)
`topN` | number

## Example

```typescript
import type { UpdateSearchConfigRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "defaultMethod": null,
  "enableAutoSelect": null,
  "graphOptions": null,
  "methodWeights": null,
  "reranker": null,
  "sourceWeights": null,
  "temporalDecay": null,
  "topN": null,
} satisfies UpdateSearchConfigRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateSearchConfigRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


