
# OpsAppDeletionResult

Counts of deleted records by type

## Properties

Name | Type
------------ | -------------
`conversations` | number
`entities` | number
`graphEntities` | number
`graphMemories` | number
`graphMentions` | number
`graphRelationships` | number
`memories` | number
`messages` | number
`redisKeys` | number
`relationships` | number

## Example

```typescript
import type { OpsAppDeletionResult } from ''

// TODO: Update the object below with actual values
const example = {
  "conversations": null,
  "entities": null,
  "graphEntities": null,
  "graphMemories": null,
  "graphMentions": null,
  "graphRelationships": null,
  "memories": null,
  "messages": null,
  "redisKeys": null,
  "relationships": null,
} satisfies OpsAppDeletionResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpsAppDeletionResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


