
# AdminCreateRegistrationAllowlistEntryRequest


## Properties

Name | Type
------------ | -------------
`kind` | [ModelenumsAllowlistEntryKind](ModelenumsAllowlistEntryKind.md)
`maxAccounts` | number
`note` | string
`value` | string

## Example

```typescript
import type { AdminCreateRegistrationAllowlistEntryRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "kind": null,
  "maxAccounts": null,
  "note": null,
  "value": null,
} satisfies AdminCreateRegistrationAllowlistEntryRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminCreateRegistrationAllowlistEntryRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


