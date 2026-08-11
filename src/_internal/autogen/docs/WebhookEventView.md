
# WebhookEventView


## Properties

Name | Type
------------ | -------------
`accountId` | string
`createdAt` | string
`eventType` | string
`id` | string
`processedAt` | string
`provider` | string
`status` | string

## Example

```typescript
import type { WebhookEventView } from ''

// TODO: Update the object below with actual values
const example = {
  "accountId": null,
  "createdAt": null,
  "eventType": null,
  "id": null,
  "processedAt": null,
  "provider": null,
  "status": null,
} satisfies WebhookEventView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebhookEventView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


