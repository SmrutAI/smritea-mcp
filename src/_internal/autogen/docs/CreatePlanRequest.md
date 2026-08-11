
# CreatePlanRequest


## Properties

Name | Type
------------ | -------------
`countryPricing` | [{ [key: string]: PlanPricing; }](PlanPricing.md)
`creditCosts` | [PlanCreditCosts](PlanCreditCosts.md)
`description` | string
`directives` | [PlanDirectives](PlanDirectives.md)
`features` | [PlanFeatures](PlanFeatures.md)
`isDefault` | boolean
`isExternal` | boolean
`name` | string
`pricing` | [PlanPricing](PlanPricing.md)
`quotas` | [PlanQuotas](PlanQuotas.md)
`rateLimits` | [PlanRateLimits](PlanRateLimits.md)
`slug` | string
`sortOrder` | number

## Example

```typescript
import type { CreatePlanRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "countryPricing": null,
  "creditCosts": null,
  "description": null,
  "directives": null,
  "features": null,
  "isDefault": null,
  "isExternal": null,
  "name": null,
  "pricing": null,
  "quotas": null,
  "rateLimits": null,
  "slug": null,
  "sortOrder": null,
} satisfies CreatePlanRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreatePlanRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


