
# DataPlaneAppResponse


## Properties

Name | Type
------------ | -------------
`dataPlaneCloud` | string
`dataPlaneId` | string
`dataPlaneRegion` | string
`response` | [AppResponse](AppResponse.md)
`syncStatus` | string

## Example

```typescript
import type { DataPlaneAppResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "dataPlaneCloud": null,
  "dataPlaneId": null,
  "dataPlaneRegion": null,
  "response": null,
  "syncStatus": null,
} satisfies DataPlaneAppResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DataPlaneAppResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


