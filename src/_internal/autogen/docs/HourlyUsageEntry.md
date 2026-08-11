
# HourlyUsageEntry


## Properties

Name | Type
------------ | -------------
`count` | number
`creditsConsumed` | number
`operationSubtype` | string
`operationType` | string
`periodHour` | string

## Example

```typescript
import type { HourlyUsageEntry } from ''

// TODO: Update the object below with actual values
const example = {
  "count": null,
  "creditsConsumed": null,
  "operationSubtype": null,
  "operationType": null,
  "periodHour": null,
} satisfies HourlyUsageEntry

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HourlyUsageEntry
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


