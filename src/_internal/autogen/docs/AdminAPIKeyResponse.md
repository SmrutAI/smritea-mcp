
# AdminAPIKeyResponse


## Properties

Name | Type
------------ | -------------
`appId` | string
`appName` | string
`createdAt` | string
`createdById` | string
`expiresAt` | string
`id` | string
`keyPrefix` | string
`lastUsed` | string
`name` | string
`orgId` | string
`orgName` | string
`status` | string

## Example

```typescript
import type { AdminAPIKeyResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "appName": null,
  "createdAt": null,
  "createdById": null,
  "expiresAt": null,
  "id": null,
  "keyPrefix": null,
  "lastUsed": null,
  "name": null,
  "orgId": null,
  "orgName": null,
  "status": null,
} satisfies AdminAPIKeyResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminAPIKeyResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


