
# OpsReconciliationSummaryResponse

Reconciliation summary response

## Properties

Name | Type
------------ | -------------
`failed` | number
`isRunning` | boolean
`lastCheck` | [OpsSanityReportResponse](OpsSanityReportResponse.md)
`pending` | number
`resolved` | number

## Example

```typescript
import type { OpsReconciliationSummaryResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "failed": null,
  "isRunning": null,
  "lastCheck": null,
  "pending": null,
  "resolved": null,
} satisfies OpsReconciliationSummaryResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpsReconciliationSummaryResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


