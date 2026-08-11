
# AdminUserResponse


## Properties

Name | Type
------------ | -------------
`countryCode` | string
`createdAt` | string
`email` | string
`id` | string
`isAdmin` | boolean
`memUsagePct` | number
`name` | string
`orgCount` | number
`orgId` | string
`orgName` | string
`orgs` | [Array&lt;UserOrgSummary&gt;](UserOrgSummary.md)
`planSlug` | string
`srchUsagePct` | number
`status` | string

## Example

```typescript
import type { AdminUserResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "countryCode": null,
  "createdAt": null,
  "email": null,
  "id": null,
  "isAdmin": null,
  "memUsagePct": null,
  "name": null,
  "orgCount": null,
  "orgId": null,
  "orgName": null,
  "orgs": null,
  "planSlug": null,
  "srchUsagePct": null,
  "status": null,
} satisfies AdminUserResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminUserResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


