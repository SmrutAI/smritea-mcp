
# OpsGDPRDeleteRequest

GDPR deletion request

## Properties

Name | Type
------------ | -------------
`appId` | string
`conversationId` | string
`level` | string

## Example

```typescript
import type { OpsGDPRDeleteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "conversationId": null,
  "level": null,
} satisfies OpsGDPRDeleteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpsGDPRDeleteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


