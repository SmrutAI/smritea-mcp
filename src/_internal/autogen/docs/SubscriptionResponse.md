
# SubscriptionResponse


## Properties

Name | Type
------------ | -------------
`authLink` | string
`authSessionId` | string
`billingCycle` | string
`checkoutSessionId` | string
`currency` | string
`environment` | string
`provider` | string
`providerSubscriptionId` | string
`status` | string
`subscriptionId` | string

## Example

```typescript
import type { SubscriptionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "authLink": null,
  "authSessionId": null,
  "billingCycle": null,
  "checkoutSessionId": null,
  "currency": null,
  "environment": null,
  "provider": null,
  "providerSubscriptionId": null,
  "status": null,
  "subscriptionId": null,
} satisfies SubscriptionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SubscriptionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


