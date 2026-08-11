
# CreateLinkRequest


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`currency` | string
`customer` | [PaymentCustomer](PaymentCustomer.md)
`notifyEmail` | boolean
`notifySms` | boolean
`purpose` | string

## Example

```typescript
import type { CreateLinkRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "currency": null,
  "customer": null,
  "notifyEmail": null,
  "notifySms": null,
  "purpose": null,
} satisfies CreateLinkRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateLinkRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


