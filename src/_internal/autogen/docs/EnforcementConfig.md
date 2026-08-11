
# EnforcementConfig


## Properties

Name | Type
------------ | -------------
`checkQuota` | boolean
`checkRateLimit` | boolean
`trackUsage` | boolean

## Example

```typescript
import type { EnforcementConfig } from ''

// TODO: Update the object below with actual values
const example = {
  "checkQuota": null,
  "checkRateLimit": null,
  "trackUsage": null,
} satisfies EnforcementConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnforcementConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


