
# ExecutionTrace


## Properties

Name | Type
------------ | -------------
`autoSelectReason` | string
`autoSelected` | boolean
`methodUsed` | string
`stepResults` | [{ [key: string]: StepResultSummary; }](StepResultSummary.md)
`timingMs` | { [key: string]: number; }

## Example

```typescript
import type { ExecutionTrace } from ''

// TODO: Update the object below with actual values
const example = {
  "autoSelectReason": null,
  "autoSelected": null,
  "methodUsed": null,
  "stepResults": null,
  "timingMs": null,
} satisfies ExecutionTrace

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExecutionTrace
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


