
# OrganizationDetails


## Properties

Name | Type
------------ | -------------
`color` | string
`createdAt` | string
`id` | string
`logoUrl` | string
`memberQuota` | number
`memoryCredits` | number
`name` | string
`plan` | [PlanInfo](PlanInfo.md)
`planId` | string
`searchCredits` | number
`slug` | string
`status` | string
`updatedAt` | string

## Example

```typescript
import type { OrganizationDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "color": null,
  "createdAt": null,
  "id": null,
  "logoUrl": null,
  "memberQuota": null,
  "memoryCredits": null,
  "name": null,
  "plan": null,
  "planId": null,
  "searchCredits": null,
  "slug": null,
  "status": null,
  "updatedAt": null,
} satisfies OrganizationDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


