
# DraftResponse


## Properties

Name | Type
------------ | -------------
`appId` | string
`config` | [UpdateAppRequest](UpdateAppRequest.md)
`createdAt` | string
`dataPlaneId` | string
`id` | string
`isNewApp` | boolean
`organizationId` | string
`updatedAt` | string
`updatedBy` | string
`updatedByName` | string
`version` | number

## Example

```typescript
import type { DraftResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "appId": null,
  "config": null,
  "createdAt": null,
  "dataPlaneId": null,
  "id": null,
  "isNewApp": null,
  "organizationId": null,
  "updatedAt": null,
  "updatedBy": null,
  "updatedByName": null,
  "version": null,
} satisfies DraftResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DraftResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


