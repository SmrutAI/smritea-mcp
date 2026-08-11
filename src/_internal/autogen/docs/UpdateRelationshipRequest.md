
# UpdateRelationshipRequest


## Properties

Name | Type
------------ | -------------
`fact` | string
`metadata` | object
`name` | string
`sourceEntityId` | string
`sourceMemoryIds` | Array&lt;string&gt;
`targetEntityId` | string
`type` | string
`validFrom` | string
`validTo` | string
`weight` | number

## Example

```typescript
import type { UpdateRelationshipRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "fact": null,
  "metadata": null,
  "name": null,
  "sourceEntityId": null,
  "sourceMemoryIds": null,
  "targetEntityId": null,
  "type": null,
  "validFrom": null,
  "validTo": null,
  "weight": null,
} satisfies UpdateRelationshipRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateRelationshipRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


