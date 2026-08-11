
# UserProfile


## Properties

Name | Type
------------ | -------------
`avatarUrl` | string
`createdAt` | string
`email` | string
`id` | string
`isOnboarded` | boolean
`name` | string
`phone` | string
`status` | string
`verified` | boolean

## Example

```typescript
import type { UserProfile } from ''

// TODO: Update the object below with actual values
const example = {
  "avatarUrl": null,
  "createdAt": null,
  "email": null,
  "id": null,
  "isOnboarded": null,
  "name": null,
  "phone": null,
  "status": null,
  "verified": null,
} satisfies UserProfile

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserProfile
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


