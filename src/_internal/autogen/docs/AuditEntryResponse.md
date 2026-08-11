
# AuditEntryResponse

Audit entry response

## Properties

Name | Type
------------ | -------------
`action` | string
`actorId` | string
`appId` | string
`createdAt` | string
`details` | { [key: string]: object; }
`errorMessage` | string
`id` | string
`ipAddress` | string
`requestId` | string
`success` | boolean

## Example

```typescript
import type { AuditEntryResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "action": null,
  "actorId": null,
  "appId": null,
  "createdAt": null,
  "details": null,
  "errorMessage": null,
  "id": null,
  "ipAddress": null,
  "requestId": null,
  "success": null,
} satisfies AuditEntryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuditEntryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


