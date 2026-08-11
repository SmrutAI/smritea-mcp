
# ForceReconcileResponse


## Properties

Name | Type
------------ | -------------
`apiKeys` | [PhaseResult](PhaseResult.md)
`errors` | [Array&lt;ForceReconcileError&gt;](ForceReconcileError.md)
`orgApps` | [PhaseResult](PhaseResult.md)
`orgProjections` | [PhaseResult](PhaseResult.md)
`planContexts` | [PhaseResult](PhaseResult.md)

## Example

```typescript
import type { ForceReconcileResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "apiKeys": null,
  "errors": null,
  "orgApps": null,
  "orgProjections": null,
  "planContexts": null,
} satisfies ForceReconcileResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ForceReconcileResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


