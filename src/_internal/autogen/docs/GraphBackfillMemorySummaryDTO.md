
# GraphBackfillMemorySummaryDTO

Graph backfill memory summary

## Properties

Name | Type
------------ | -------------
`failedCount` | number
`newEntities` | number
`newRelationships` | number
`successfulCount` | number
`totalEntities` | number
`totalMemories` | number
`totalRelationships` | number

## Example

```typescript
import type { GraphBackfillMemorySummaryDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "failedCount": null,
  "newEntities": null,
  "newRelationships": null,
  "successfulCount": null,
  "totalEntities": null,
  "totalMemories": null,
  "totalRelationships": null,
} satisfies GraphBackfillMemorySummaryDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GraphBackfillMemorySummaryDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


