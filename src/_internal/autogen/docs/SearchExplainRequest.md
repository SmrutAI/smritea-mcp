
# SearchExplainRequest


## Properties

Name | Type
------------ | -------------
`actorId` | string
`actorType` | string
`appId` | string
`conversationId` | string
`explainOptions` | [SearchExplainOptions](SearchExplainOptions.md)
`fromTime` | string
`graphDepth` | number
`includeExplanation` | boolean
`limit` | number
`metadataFilter` | object
`method` | string
`participantIds` | Array&lt;string&gt;
`query` | string
`rerankerType` | [RerankerType](RerankerType.md)
`speakerActorId` | string
`toTime` | string
`validAt` | string

## Example

```typescript
import type { SearchExplainRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "actorId": null,
  "actorType": null,
  "appId": null,
  "conversationId": null,
  "explainOptions": null,
  "fromTime": null,
  "graphDepth": null,
  "includeExplanation": null,
  "limit": null,
  "metadataFilter": null,
  "method": null,
  "participantIds": null,
  "query": null,
  "rerankerType": null,
  "speakerActorId": null,
  "toTime": null,
  "validAt": null,
} satisfies SearchExplainRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchExplainRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


