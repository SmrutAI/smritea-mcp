
# DirectivesResponse


## Properties

Name | Type
------------ | -------------
`affirmativeDirective` | string
`extractionDirective` | string
`tagSchema` | [Array&lt;TagSchemaDef&gt;](TagSchemaDef.md)

## Example

```typescript
import type { DirectivesResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "affirmativeDirective": null,
  "extractionDirective": null,
  "tagSchema": null,
} satisfies DirectivesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DirectivesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


