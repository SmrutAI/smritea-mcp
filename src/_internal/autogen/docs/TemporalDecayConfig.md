
# TemporalDecayConfig


## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`lambda` | number
`maxAgeDays` | number

## Example

```typescript
import type { TemporalDecayConfig } from ''

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "lambda": null,
  "maxAgeDays": null,
} satisfies TemporalDecayConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TemporalDecayConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


