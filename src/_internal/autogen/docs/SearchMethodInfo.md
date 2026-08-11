
# SearchMethodInfo


## Properties

Name | Type
------------ | -------------
`avgLatencyMs` | number
`description` | string
`displayName` | string
`name` | string
`recommendedFor` | Array&lt;string&gt;
`supportsBm25` | boolean
`supportsGraph` | boolean

## Example

```typescript
import type { SearchMethodInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "avgLatencyMs": null,
  "description": null,
  "displayName": null,
  "name": null,
  "recommendedFor": null,
  "supportsBm25": null,
  "supportsGraph": null,
} satisfies SearchMethodInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchMethodInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


