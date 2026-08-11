
# PlanInfo


## Properties

Name | Type
------------ | -------------
`description` | string
`id` | string
`isExternal` | boolean
`name` | string
`quotas` | [PlanQuotas](PlanQuotas.md)
`rateLimits` | [PlanRateLimits](PlanRateLimits.md)
`slug` | string

## Example

```typescript
import type { PlanInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "id": null,
  "isExternal": null,
  "name": null,
  "quotas": null,
  "rateLimits": null,
  "slug": null,
} satisfies PlanInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


