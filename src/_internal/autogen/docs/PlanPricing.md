
# PlanPricing


## Properties

Name | Type
------------ | -------------
`countryCode` | string
`currency` | string
`monthlyPricePerMonth` | number
`yearlyPricePerMonth` | number

## Example

```typescript
import type { PlanPricing } from ''

// TODO: Update the object below with actual values
const example = {
  "countryCode": null,
  "currency": null,
  "monthlyPricePerMonth": null,
  "yearlyPricePerMonth": null,
} satisfies PlanPricing

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanPricing
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


