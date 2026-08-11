
# PaymentAttemptView


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`attemptType` | string
`attemptedAt` | string
`createdAt` | string
`currency` | string
`failureReason` | string
`id` | string
`paymentOrderId` | string
`paymentType` | string
`provider` | string
`providerPaymentId` | string
`providerResponseRaw` | string
`status` | string
`subscriptionId` | string

## Example

```typescript
import type { PaymentAttemptView } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "attemptType": null,
  "attemptedAt": null,
  "createdAt": null,
  "currency": null,
  "failureReason": null,
  "id": null,
  "paymentOrderId": null,
  "paymentType": null,
  "provider": null,
  "providerPaymentId": null,
  "providerResponseRaw": null,
  "status": null,
  "subscriptionId": null,
} satisfies PaymentAttemptView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PaymentAttemptView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


