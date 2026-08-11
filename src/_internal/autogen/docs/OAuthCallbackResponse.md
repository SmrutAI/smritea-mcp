
# OAuthCallbackResponse


## Properties

Name | Type
------------ | -------------
`accessToken` | string
`email` | string
`expiresIn` | number
`isNewUser` | boolean
`name` | string
`organizationId` | string
`refreshToken` | string
`tokenType` | string
`userId` | string

## Example

```typescript
import type { OAuthCallbackResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "accessToken": null,
  "email": null,
  "expiresIn": null,
  "isNewUser": null,
  "name": null,
  "organizationId": null,
  "refreshToken": null,
  "tokenType": null,
  "userId": null,
} satisfies OAuthCallbackResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OAuthCallbackResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


