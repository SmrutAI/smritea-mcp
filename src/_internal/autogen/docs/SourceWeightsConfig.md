
# SourceWeightsConfig


## Properties

Name | Type
------------ | -------------
`entitySeedWeight` | number
`graphExpandedWeight` | number
`llmSeedWeight` | number
`relationshipSeedWeight` | number

## Example

```typescript
import type { SourceWeightsConfig } from ''

// TODO: Update the object below with actual values
const example = {
  "entitySeedWeight": null,
  "graphExpandedWeight": null,
  "llmSeedWeight": null,
  "relationshipSeedWeight": null,
} satisfies SourceWeightsConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SourceWeightsConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


