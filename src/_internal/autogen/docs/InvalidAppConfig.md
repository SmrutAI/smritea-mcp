
# InvalidAppConfig


## Properties

Name | Type
------------ | -------------
`config` | [AppConfigKind](AppConfigKind.md)
`error` | string

## Example

```typescript
import type { InvalidAppConfig } from ''

// TODO: Update the object below with actual values
const example = {
  "config": null,
  "error": null,
} satisfies InvalidAppConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InvalidAppConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


