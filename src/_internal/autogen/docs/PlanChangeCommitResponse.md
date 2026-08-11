
# PlanChangeCommitResponse


## Properties

Name | Type
------------ | -------------
`action` | string
`authLink` | string
`authSessionId` | string
`checkoutSessionId` | string
`effectiveAt` | string
`environment` | string
`provider` | string
`requiresAuthorization` | boolean
`subscriptionId` | string

## Example

```typescript
import type { PlanChangeCommitResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "action": null,
  "authLink": null,
  "authSessionId": null,
  "checkoutSessionId": null,
  "effectiveAt": null,
  "environment": null,
  "provider": null,
  "requiresAuthorization": null,
  "subscriptionId": null,
} satisfies PlanChangeCommitResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanChangeCommitResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


