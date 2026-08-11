
# SearchExplainResponse


## Properties

Name | Type
------------ | -------------
`configUsed` | [ConfigUsed](ConfigUsed.md)
`executionTrace` | [ExecutionTrace](ExecutionTrace.md)
`explainTrace` | [Trace](Trace.md)
`results` | [Array&lt;ExplainedResult&gt;](ExplainedResult.md)

## Example

```typescript
import type { SearchExplainResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "configUsed": null,
  "executionTrace": null,
  "explainTrace": null,
  "results": null,
} satisfies SearchExplainResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchExplainResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


