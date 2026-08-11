
# MemoryExtractionResultDTO

Memory extraction result

## Properties

Name | Type
------------ | -------------
`entities` | [Array&lt;EntityOutputDTO&gt;](EntityOutputDTO.md)
`memoryId` | string
`relationships` | [Array&lt;RelationshipOutputDTO&gt;](RelationshipOutputDTO.md)

## Example

```typescript
import type { MemoryExtractionResultDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "entities": null,
  "memoryId": null,
  "relationships": null,
} satisfies MemoryExtractionResultDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MemoryExtractionResultDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


