
# AppResponse


## Properties

Name | Type
------------ | -------------
`createdAt` | string
`description` | string
`directiveConfig` | [DirectiveConfig](DirectiveConfig.md)
`extractionConfig` | [ExtractionConfig](ExtractionConfig.md)
`id` | string
`memoryCount` | number
`name` | string
`searchConfig` | [SearchConfig](SearchConfig.md)
`status` | [AppStatus](AppStatus.md)
`updatedAt` | string

## Example

```typescript
import type { AppResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "createdAt": null,
  "description": null,
  "directiveConfig": null,
  "extractionConfig": null,
  "id": null,
  "memoryCount": null,
  "name": null,
  "searchConfig": null,
  "status": null,
  "updatedAt": null,
} satisfies AppResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AppResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


