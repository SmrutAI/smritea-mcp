
# PlanVersionResponse


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`currency` | string
`id` | string
`interval` | number
`intervalType` | string
`isCurrent` | boolean
`isExternal` | boolean
`isOrgCurrent` | boolean
`planKey` | string
`planName` | string
`planType` | string
`priceUnavailable` | boolean
`version` | number
`yearlyAmountMinor` | number
`yearlyPriceUnavailable` | boolean

## Example

```typescript
import type { PlanVersionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "currency": null,
  "id": null,
  "interval": null,
  "intervalType": null,
  "isCurrent": null,
  "isExternal": null,
  "isOrgCurrent": null,
  "planKey": null,
  "planName": null,
  "planType": null,
  "priceUnavailable": null,
  "version": null,
  "yearlyAmountMinor": null,
  "yearlyPriceUnavailable": null,
} satisfies PlanVersionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanVersionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


