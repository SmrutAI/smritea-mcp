
# WebhookEventLedgerDetail


## Properties

Name | Type
------------ | -------------
`accountId` | string
`createdAt` | string
`dedupeKey` | string
`eventType` | string
`id` | string
`processedAt` | string
`processingError` | string
`provider` | string
`rawHeaders` | object
`rawPayload` | Array&lt;number&gt;
`status` | string

## Example

```typescript
import type { WebhookEventLedgerDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "accountId": null,
  "createdAt": null,
  "dedupeKey": null,
  "eventType": null,
  "id": null,
  "processedAt": null,
  "processingError": null,
  "provider": null,
  "rawHeaders": null,
  "rawPayload": null,
  "status": null,
} satisfies WebhookEventLedgerDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebhookEventLedgerDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


