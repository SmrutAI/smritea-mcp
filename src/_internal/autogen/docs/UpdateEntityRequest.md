
# UpdateEntityRequest


## Properties

Name | Type
------------ | -------------
`aliases` | Array&lt;string&gt;
`attributes` | { [key: string]: object; }
`customType` | string
`name` | string
`sourceMemoryIds` | Array&lt;string&gt;
`type` | string

## Example

```typescript
import type { UpdateEntityRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "aliases": null,
  "attributes": null,
  "customType": null,
  "name": null,
  "sourceMemoryIds": null,
  "type": null,
} satisfies UpdateEntityRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateEntityRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


