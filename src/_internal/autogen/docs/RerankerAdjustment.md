
# RerankerAdjustment


## Properties

Name | Type
------------ | -------------
`ageDays` | number
`decayFactor` | number
`rankAfter` | number
`rankBefore` | number
`scoreDelta` | number
`step` | string

## Example

```typescript
import type { RerankerAdjustment } from ''

// TODO: Update the object below with actual values
const example = {
  "ageDays": null,
  "decayFactor": null,
  "rankAfter": null,
  "rankBefore": null,
  "scoreDelta": null,
  "step": null,
} satisfies RerankerAdjustment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RerankerAdjustment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


