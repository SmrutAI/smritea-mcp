
# OpsViolationResponse

Sanity violation response

## Properties

Name | Type
------------ | -------------
`appId` | string
`entityId` | string
`firstSeenAt` | string
`id` | string
`lastSeenAt` | string
`memoryId` | string
`message` | string
`resolvedAt` | string
`status` | string
`type` | string

## Example

```typescript
import type { OpsViolationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "entityId": null,
  "firstSeenAt": null,
  "id": null,
  "lastSeenAt": null,
  "memoryId": null,
  "message": null,
  "resolvedAt": null,
  "status": null,
  "type": null,
} satisfies OpsViolationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpsViolationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


