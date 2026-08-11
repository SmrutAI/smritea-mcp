
# DashboardSummaryResponse


## Properties

Name | Type
------------ | -------------
`appsCount` | number
`keysCount` | number
`memoriesCount` | number
`plan` | [PlanSummary](PlanSummary.md)
`recentActivity` | Array&lt;object&gt;
`searchesCount` | number

## Example

```typescript
import type { DashboardSummaryResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "appsCount": null,
  "keysCount": null,
  "memoriesCount": null,
  "plan": null,
  "recentActivity": null,
  "searchesCount": null,
} satisfies DashboardSummaryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DashboardSummaryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


