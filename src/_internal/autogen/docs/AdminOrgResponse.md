
# AdminOrgResponse


## Properties

Name | Type
------------ | -------------
`activeMemberCount` | number
`blockedMemberCount` | number
`countryCode` | string
`createdAt` | string
`id` | string
`memCreditsGranted` | number
`memCreditsUsed` | number
`memUsagePct` | number
`name` | string
`pendingInviteCount` | number
`planId` | string
`planName` | string
`planSlug` | string
`slug` | string
`srchCreditsGranted` | number
`srchCreditsUsed` | number
`srchUsagePct` | number
`status` | string

## Example

```typescript
import type { AdminOrgResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "activeMemberCount": null,
  "blockedMemberCount": null,
  "countryCode": null,
  "createdAt": null,
  "id": null,
  "memCreditsGranted": null,
  "memCreditsUsed": null,
  "memUsagePct": null,
  "name": null,
  "pendingInviteCount": null,
  "planId": null,
  "planName": null,
  "planSlug": null,
  "slug": null,
  "srchCreditsGranted": null,
  "srchCreditsUsed": null,
  "srchUsagePct": null,
  "status": null,
} satisfies AdminOrgResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminOrgResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


