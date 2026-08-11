
# APIKeyDetails


## Properties

Name | Type
------------ | -------------
`appId` | string
`appName` | string
`createdAt` | string
`createdBy` | string
`expiresAt` | string
`id` | string
`keyPrefix` | string
`lastUsed` | string
`name` | string
`organizationId` | string
`scopes` | Array&lt;string&gt;
`status` | string

## Example

```typescript
import type { APIKeyDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "appName": null,
  "createdAt": null,
  "createdBy": null,
  "expiresAt": null,
  "id": null,
  "keyPrefix": null,
  "lastUsed": null,
  "name": null,
  "organizationId": null,
  "scopes": null,
  "status": null,
} satisfies APIKeyDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as APIKeyDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


