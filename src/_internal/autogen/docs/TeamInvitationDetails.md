
# TeamInvitationDetails


## Properties

Name | Type
------------ | -------------
`acceptedAt` | string
`cancelledAt` | string
`cancelledBy` | string
`createdAt` | string
`email` | string
`expiresAt` | string
`id` | string
`inviterId` | string
`inviterName` | string
`orgName` | string
`organizationId` | string
`rejectedAt` | string
`role` | [TeamRole](TeamRole.md)
`status` | [TeamInvitationStatus](TeamInvitationStatus.md)
`teamId` | string
`teamName` | string
`token` | string

## Example

```typescript
import type { TeamInvitationDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "acceptedAt": null,
  "cancelledAt": null,
  "cancelledBy": null,
  "createdAt": null,
  "email": null,
  "expiresAt": null,
  "id": null,
  "inviterId": null,
  "inviterName": null,
  "orgName": null,
  "organizationId": null,
  "rejectedAt": null,
  "role": null,
  "status": null,
  "teamId": null,
  "teamName": null,
  "token": null,
} satisfies TeamInvitationDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamInvitationDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


