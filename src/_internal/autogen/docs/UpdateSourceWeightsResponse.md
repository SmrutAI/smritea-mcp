
# UpdateSourceWeightsResponse


## Properties

Name | Type
------------ | -------------
`appId` | string
`message` | string
`sourceWeights` | [SourceWeightsConfig](SourceWeightsConfig.md)
`updatedAt` | string

## Example

```typescript
import type { UpdateSourceWeightsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "message": null,
  "sourceWeights": null,
  "updatedAt": null,
} satisfies UpdateSourceWeightsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateSourceWeightsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


