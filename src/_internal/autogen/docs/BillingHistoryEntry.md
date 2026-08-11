
# BillingHistoryEntry


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`currency` | string
`description` | string
`failureReason` | string
`id` | string
`kind` | string
`occurredAt` | string
`planName` | string
`provider` | string
`providerPaymentId` | string
`status` | string

## Example

```typescript
import type { BillingHistoryEntry } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "currency": null,
  "description": null,
  "failureReason": null,
  "id": null,
  "kind": null,
  "occurredAt": null,
  "planName": null,
  "provider": null,
  "providerPaymentId": null,
  "status": null,
} satisfies BillingHistoryEntry

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BillingHistoryEntry
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


