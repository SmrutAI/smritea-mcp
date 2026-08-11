
# UpdateAppRequest


## Properties

Name | Type
------------ | -------------
`description` | string
`directiveConfig` | [DirectiveConfig](DirectiveConfig.md)
`extractionConfig` | [ExtractionConfig](ExtractionConfig.md)
`name` | string
`searchConfig` | [SearchConfig](SearchConfig.md)

## Example

```typescript
import type { UpdateAppRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "directiveConfig": null,
  "extractionConfig": null,
  "name": null,
  "searchConfig": null,
} satisfies UpdateAppRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateAppRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


