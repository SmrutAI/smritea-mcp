
# PlanChangeDowngradePreview


## Properties

Name | Type
------------ | -------------
`currentPlanName` | string
`currentUntil` | string
`newRecurringInterval` | string
`newRecurringMinor` | number
`newRecurringStartsAt` | string

## Example

```typescript
import type { PlanChangeDowngradePreview } from ''

// TODO: Update the object below with actual values
const example = {
  "currentPlanName": null,
  "currentUntil": null,
  "newRecurringInterval": null,
  "newRecurringMinor": null,
  "newRecurringStartsAt": null,
} satisfies PlanChangeDowngradePreview

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanChangeDowngradePreview
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


