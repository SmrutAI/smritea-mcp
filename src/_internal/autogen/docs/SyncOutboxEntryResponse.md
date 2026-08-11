
# SyncOutboxEntryResponse


## Properties

Name | Type
------------ | -------------
`createdAt` | string
`entityKey` | string
`entityType` | string
`id` | string
`lastError` | string
`maxRetries` | number
`operation` | string
`retryCount` | number
`status` | string
`targetPlaneUrl` | string
`updatedAt` | string

## Example

```typescript
import type { SyncOutboxEntryResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "createdAt": null,
  "entityKey": null,
  "entityType": null,
  "id": null,
  "lastError": null,
  "maxRetries": null,
  "operation": null,
  "retryCount": null,
  "status": null,
  "targetPlaneUrl": null,
  "updatedAt": null,
} satisfies SyncOutboxEntryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SyncOutboxEntryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


