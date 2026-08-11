
# EntityMatchResponse


## Properties

Name | Type
------------ | -------------
`entity` | [EntityResponse](EntityResponse.md)
`matchMethod` | string
`score` | number

## Example

```typescript
import type { EntityMatchResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "entity": null,
  "matchMethod": null,
  "score": null,
} satisfies EntityMatchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityMatchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


