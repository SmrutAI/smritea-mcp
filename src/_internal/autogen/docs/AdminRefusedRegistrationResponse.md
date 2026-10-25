
# AdminRefusedRegistrationResponse


## Properties

Name | Type
------------ | -------------
`attemptCount` | number
`domain` | string
`email` | string
`firstAttemptAt` | string
`id` | string
`lastAttemptAt` | string
`provider` | [ModelenumsSignupProvider](ModelenumsSignupProvider.md)
`reason` | [ModelenumsRefusedReason](ModelenumsRefusedReason.md)

## Example

```typescript
import type { AdminRefusedRegistrationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "attemptCount": null,
  "domain": null,
  "email": null,
  "firstAttemptAt": null,
  "id": null,
  "lastAttemptAt": null,
  "provider": null,
  "reason": null,
} satisfies AdminRefusedRegistrationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminRefusedRegistrationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


