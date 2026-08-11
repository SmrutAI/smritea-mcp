
# DebugChatResponse

Chat response payload

## Properties

Name | Type
------------ | -------------
`done` | boolean
`evalCount` | number
`message` | [DebugChatMessage](DebugChatMessage.md)
`model` | string
`promptEvalCount` | number
`totalDuration` | number

## Example

```typescript
import type { DebugChatResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "done": null,
  "evalCount": null,
  "message": null,
  "model": null,
  "promptEvalCount": null,
  "totalDuration": null,
} satisfies DebugChatResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DebugChatResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


