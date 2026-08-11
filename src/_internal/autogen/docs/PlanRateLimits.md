
# PlanRateLimits


## Properties

Name | Type
------------ | -------------
`memoryCreatePerDay` | number
`memoryCreatePerMinute` | number
`memoryCreatePerSecond` | number
`searchPerDay` | number
`searchPerMinute` | number
`searchPerSecond` | number

## Example

```typescript
import type { PlanRateLimits } from ''

// TODO: Update the object below with actual values
const example = {
  "memoryCreatePerDay": null,
  "memoryCreatePerMinute": null,
  "memoryCreatePerSecond": null,
  "searchPerDay": null,
  "searchPerMinute": null,
  "searchPerSecond": null,
} satisfies PlanRateLimits

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanRateLimits
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


