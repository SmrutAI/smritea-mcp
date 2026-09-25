
# ListActorsResponse


## Properties

Name | Type
------------ | -------------
`actors` | [Array&lt;ActorSummary&gt;](ActorSummary.md)
`total` | number

## Example

```typescript
import type { ListActorsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "actors": null,
  "total": null,
} satisfies ListActorsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListActorsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


