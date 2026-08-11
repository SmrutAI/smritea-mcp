
# ScoreComponents


## Properties

Name | Type
------------ | -------------
`bm25Score` | number
`graphScore` | number
`temporalScore` | number
`vectorScore` | number

## Example

```typescript
import type { ScoreComponents } from ''

// TODO: Update the object below with actual values
const example = {
  "bm25Score": null,
  "graphScore": null,
  "temporalScore": null,
  "vectorScore": null,
} satisfies ScoreComponents

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreComponents
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


