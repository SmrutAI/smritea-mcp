
# PlanResponse


## Properties

Name | Type
------------ | -------------
`amountMinor` | number
`countryPricing` | [{ [key: string]: PlanPricing; }](PlanPricing.md)
`createdAt` | string
`creditCosts` | [PlanCreditCosts](PlanCreditCosts.md)
`currency` | string
`description` | string
`directives` | [PlanDirectives](PlanDirectives.md)
`features` | [PlanFeatures](PlanFeatures.md)
`id` | string
`interval` | number
`intervalType` | string
`isCurrent` | boolean
`isDefault` | boolean
`maxAmountMinor` | number
`maxCycles` | number
`name` | string
`planType` | string
`pricing` | [PlanPricing](PlanPricing.md)
`quotas` | [PlanQuotas](PlanQuotas.md)
`rateLimits` | [PlanRateLimits](PlanRateLimits.md)
`slug` | string
`sortOrder` | number
`updatedAt` | string
`version` | number

## Example

```typescript
import type { PlanResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "amountMinor": null,
  "countryPricing": null,
  "createdAt": null,
  "creditCosts": null,
  "currency": null,
  "description": null,
  "directives": null,
  "features": null,
  "id": null,
  "interval": null,
  "intervalType": null,
  "isCurrent": null,
  "isDefault": null,
  "maxAmountMinor": null,
  "maxCycles": null,
  "name": null,
  "planType": null,
  "pricing": null,
  "quotas": null,
  "rateLimits": null,
  "slug": null,
  "sortOrder": null,
  "updatedAt": null,
  "version": null,
} satisfies PlanResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


