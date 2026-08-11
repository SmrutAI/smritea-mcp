
# CreateEntityRequest


## Properties

Name | Type
------------ | -------------
`actorId` | string
`aliases` | Array&lt;string&gt;
`appId` | string
`attributes` | { [key: string]: object; }
`customType` | string
`name` | string
`type` | string

## Example

```typescript
import type { CreateEntityRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "actorId": null,
  "aliases": null,
  "appId": null,
  "attributes": null,
  "customType": null,
  "name": null,
  "type": null,
} satisfies CreateEntityRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateEntityRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


