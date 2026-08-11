
# PublicInvitationInfo


## Properties

Name | Type
------------ | -------------
`expiresAt` | string
`invalidReason` | string
`inviterEmail` | string
`inviterName` | string
`orgName` | string
`role` | string
`teamName` | string
`valid` | boolean

## Example

```typescript
import type { PublicInvitationInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "expiresAt": null,
  "invalidReason": null,
  "inviterEmail": null,
  "inviterName": null,
  "orgName": null,
  "role": null,
  "teamName": null,
  "valid": null,
} satisfies PublicInvitationInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PublicInvitationInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


