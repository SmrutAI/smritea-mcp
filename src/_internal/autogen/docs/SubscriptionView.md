
# SubscriptionView


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`authLink` | string
`authSessionId` | string
`billingCycle` | string
`cancelAt` | string
`currency` | string
`environment` | string
`isTerminal` | boolean
`needsAuthorization` | boolean
`nextChargeDate` | string
`orgId` | string
`orgName` | string
`pendingAuthLink` | string
`pendingAuthSessionId` | string
`pendingEffectiveAt` | string
`pendingPlanKey` | string
`pendingPlanName` | string
`pendingRequiresAuthorization` | boolean
`planKey` | string
`planName` | string
`priceUnavailable` | boolean
`provider` | string
`providerSubscriptionId` | string
`status` | string
`subscriptionId` | string

## Example

```typescript
import type { SubscriptionView } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "authLink": null,
  "authSessionId": null,
  "billingCycle": null,
  "cancelAt": null,
  "currency": null,
  "environment": null,
  "isTerminal": null,
  "needsAuthorization": null,
  "nextChargeDate": null,
  "orgId": null,
  "orgName": null,
  "pendingAuthLink": null,
  "pendingAuthSessionId": null,
  "pendingEffectiveAt": null,
  "pendingPlanKey": null,
  "pendingPlanName": null,
  "pendingRequiresAuthorization": null,
  "planKey": null,
  "planName": null,
  "priceUnavailable": null,
  "provider": null,
  "providerSubscriptionId": null,
  "status": null,
  "subscriptionId": null,
} satisfies SubscriptionView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SubscriptionView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


