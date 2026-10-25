
# AdminRegistrationAllowlistEntryResponse


## Properties

Name | Type
------------ | -------------
`createdAt` | string
`createdBy` | string
`id` | string
`kind` | [ModelenumsAllowlistEntryKind](ModelenumsAllowlistEntryKind.md)
`maxAccounts` | number
`note` | string
`updatedAt` | string
`value` | string

## Example

```typescript
import type { AdminRegistrationAllowlistEntryResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "createdAt": null,
  "createdBy": null,
  "id": null,
  "kind": null,
  "maxAccounts": null,
  "note": null,
  "updatedAt": null,
  "value": null,
} satisfies AdminRegistrationAllowlistEntryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminRegistrationAllowlistEntryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


