
# LoginChallengeResponse


## Properties

Name | Type
------------ | -------------
`orgs` | [Array&lt;OrgSummary&gt;](OrgSummary.md)
`selectionToken` | string

## Example

```typescript
import type { LoginChallengeResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "orgs": null,
  "selectionToken": null,
} satisfies LoginChallengeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LoginChallengeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


