
# PlanChangeUpgradePreview


## Properties

Name | Type
------------ | -------------
`currentUntil` | string
`daysRemaining` | number
`newRecurringInterval` | string
`newRecurringMinor` | number
`newRecurringStartsAt` | string
`prorataNowMinor` | number
`requiresReauthorization` | boolean

## Example

```typescript
import type { PlanChangeUpgradePreview } from ''

// TODO: Update the object below with actual values
const example = {
  "currentUntil": null,
  "daysRemaining": null,
  "newRecurringInterval": null,
  "newRecurringMinor": null,
  "newRecurringStartsAt": null,
  "prorataNowMinor": null,
  "requiresReauthorization": null,
} satisfies PlanChangeUpgradePreview

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanChangeUpgradePreview
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


