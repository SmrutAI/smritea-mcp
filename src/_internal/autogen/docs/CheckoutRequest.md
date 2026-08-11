
# CheckoutRequest


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`appReturnUrl` | string
`currency` | string
`customer` | [PaymentCustomer](PaymentCustomer.md)
`planKey` | string
`purpose` | string

## Example

```typescript
import type { CheckoutRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "appReturnUrl": null,
  "currency": null,
  "customer": null,
  "planKey": null,
  "purpose": null,
} satisfies CheckoutRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CheckoutRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


