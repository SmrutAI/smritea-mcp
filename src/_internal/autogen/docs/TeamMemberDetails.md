
# TeamMemberDetails


## Properties

Name | Type
------------ | -------------
`createdAt` | string
`email` | string
`id` | string
`name` | string
`organizationId` | string
`role` | string
`teamId` | string
`userId` | string

## Example

```typescript
import type { TeamMemberDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "createdAt": null,
  "email": null,
  "id": null,
  "name": null,
  "organizationId": null,
  "role": null,
  "teamId": null,
  "userId": null,
} satisfies TeamMemberDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TeamMemberDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


