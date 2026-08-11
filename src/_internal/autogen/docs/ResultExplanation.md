
# ResultExplanation


## Properties

Name | Type
------------ | -------------
`components` | [ScoreComponents](ScoreComponents.md)
`graphPath` | Array&lt;string&gt;
`matchedEntities` | Array&lt;string&gt;
`rerankerAdjustments` | [Array&lt;RerankerAdjustment&gt;](RerankerAdjustment.md)
`seedSource` | string
`seedWeight` | number
`weightsApplied` | [WeightsApplied](WeightsApplied.md)

## Example

```typescript
import type { ResultExplanation } from ''

// TODO: Update the object below with actual values
const example = {
  "components": null,
  "graphPath": null,
  "matchedEntities": null,
  "rerankerAdjustments": null,
  "seedSource": null,
  "seedWeight": null,
  "weightsApplied": null,
} satisfies ResultExplanation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResultExplanation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


