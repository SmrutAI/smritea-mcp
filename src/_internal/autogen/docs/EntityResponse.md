
# EntityResponse


## Properties

Name | Type
------------ | -------------
`actorId` | string
`aliases` | Array&lt;string&gt;
`appId` | string
`attributes` | { [key: string]: object; }
`createdAt` | string
`customType` | string
`id` | string
`name` | string
`sourceMemoryIds` | Array&lt;string&gt;
`type` | string
`updatedAt` | string

## Example

```typescript
import type { EntityResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "actorId": null,
  "aliases": null,
  "appId": null,
  "attributes": null,
  "createdAt": null,
  "customType": null,
  "id": null,
  "name": null,
  "sourceMemoryIds": null,
  "type": null,
  "updatedAt": null,
} satisfies EntityResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EntityResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


