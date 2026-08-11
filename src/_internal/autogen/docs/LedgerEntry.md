
# LedgerEntry


## Properties

Name | Type
------------ | -------------
`amount` | number
`balanceAfter` | number
`createdAt` | string
`creditType` | string
`id` | string
`period` | string
`reason` | string
`referenceId` | string
`referenceType` | string
`source` | string

## Example

```typescript
import type { LedgerEntry } from ''

// TODO: Update the object below with actual values
const example = {
  "amount": null,
  "balanceAfter": null,
  "createdAt": null,
  "creditType": null,
  "id": null,
  "period": null,
  "reason": null,
  "referenceId": null,
  "referenceType": null,
  "source": null,
} satisfies LedgerEntry

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LedgerEntry
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


