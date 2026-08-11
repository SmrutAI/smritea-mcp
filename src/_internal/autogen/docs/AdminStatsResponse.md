
# AdminStatsResponse


## Properties

Name | Type
------------ | -------------
`activeSubs` | number
`adminUsers` | number
`freeUsers` | number
`paidUsers` | number
`topLocations` | [Array&lt;LocationCount&gt;](LocationCount.md)
`totalUsers` | number
`trialExhausted` | number

## Example

```typescript
import type { AdminStatsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "activeSubs": null,
  "adminUsers": null,
  "freeUsers": null,
  "paidUsers": null,
  "topLocations": null,
  "totalUsers": null,
  "trialExhausted": null,
} satisfies AdminStatsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminStatsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


