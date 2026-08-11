
# CheckoutResponse


## Properties

Name | Type
------------ | -------------
`checkout` | [CheckoutPayloadResponse](CheckoutPayloadResponse.md)
`orderId` | string

## Example

```typescript
import type { CheckoutResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "checkout": null,
  "orderId": null,
} satisfies CheckoutResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CheckoutResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


