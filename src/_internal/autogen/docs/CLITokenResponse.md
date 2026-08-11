
# CLITokenResponse


## Properties

Name | Type
------------ | -------------
`accessToken` | string
`email` | string
`expiresIn` | number
`organizationId` | string
`refreshToken` | string
`tokenType` | string
`userId` | string

## Example

```typescript
import type { CLITokenResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "accessToken": null,
  "email": null,
  "expiresIn": null,
  "organizationId": null,
  "refreshToken": null,
  "tokenType": null,
  "userId": null,
} satisfies CLITokenResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CLITokenResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


