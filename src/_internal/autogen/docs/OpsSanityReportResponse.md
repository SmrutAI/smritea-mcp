
# OpsSanityReportResponse

Sanity check report

## Properties

Name | Type
------------ | -------------
`durationMs` | number
`memoriesChecked` | number
`pendingPromoted` | number
`runAt` | string
`violationsFound` | number
`violationsResolved` | number

## Example

```typescript
import type { OpsSanityReportResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "durationMs": null,
  "memoriesChecked": null,
  "pendingPromoted": null,
  "runAt": null,
  "violationsFound": null,
  "violationsResolved": null,
} satisfies OpsSanityReportResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpsSanityReportResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


