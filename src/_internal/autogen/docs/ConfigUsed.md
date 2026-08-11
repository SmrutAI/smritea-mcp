
# ConfigUsed


## Properties

Name | Type
------------ | -------------
`graph` | [GraphConfigUsed](GraphConfigUsed.md)
`reranker` | [RerankerConfigUsed](RerankerConfigUsed.md)
`temporal` | [TemporalConfigUsed](TemporalConfigUsed.md)

## Example

```typescript
import type { ConfigUsed } from ''

// TODO: Update the object below with actual values
const example = {
  "graph": null,
  "reranker": null,
  "temporal": null,
} satisfies ConfigUsed

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConfigUsed
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


