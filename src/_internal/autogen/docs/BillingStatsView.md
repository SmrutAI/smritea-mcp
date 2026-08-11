
# BillingStatsView


## Properties

Name | Type
------------ | -------------
`activeCount` | number
`arpuMinor` | number
`arrMinor` | number
`churnRate` | number
`churnedCount` | number
`currency` | string
`failedPaymentCount` | number
`from` | string
`mrrMinor` | number
`mrrSeries` | [Array&lt;MRRSeriesPoint&gt;](MRRSeriesPoint.md)
`newChurnedSeries` | [Array&lt;SubscriptionFlowSeriesPoint&gt;](SubscriptionFlowSeriesPoint.md)
`newCount` | number
`onHoldCount` | number
`revenueByPlan` | [Array&lt;RevenueByPlanEntry&gt;](RevenueByPlanEntry.md)
`to` | string

## Example

```typescript
import type { BillingStatsView } from ''

// TODO: Update the object below with actual values
const example = {
  "activeCount": null,
  "arpuMinor": null,
  "arrMinor": null,
  "churnRate": null,
  "churnedCount": null,
  "currency": null,
  "failedPaymentCount": null,
  "from": null,
  "mrrMinor": null,
  "mrrSeries": null,
  "newChurnedSeries": null,
  "newCount": null,
  "onHoldCount": null,
  "revenueByPlan": null,
  "to": null,
} satisfies BillingStatsView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BillingStatsView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


