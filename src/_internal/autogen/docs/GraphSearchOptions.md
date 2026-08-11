
# GraphSearchOptions


## Properties

Name | Type
------------ | -------------
`direction` | string
`entityBoostFactor` | number
`hopDecayFactor` | number
`maxHops` | number
`relationshipTypes` | Array&lt;string&gt;

## Example

```typescript
import type { GraphSearchOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "direction": null,
  "entityBoostFactor": null,
  "hopDecayFactor": null,
  "maxHops": null,
  "relationshipTypes": null,
} satisfies GraphSearchOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GraphSearchOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


