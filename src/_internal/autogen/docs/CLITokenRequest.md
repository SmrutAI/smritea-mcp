
# CLITokenRequest


## Properties

Name | Type
------------ | -------------
`clientId` | string
`code` | string
`codeVerifier` | string
`grantType` | string
`redirectUri` | string

## Example

```typescript
import type { CLITokenRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "clientId": null,
  "code": null,
  "codeVerifier": null,
  "grantType": null,
  "redirectUri": null,
} satisfies CLITokenRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CLITokenRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


