
# OpsPaginatedViolationsResponse

Paginated violations response

## Properties

Name | Type
------------ | -------------
`limit` | number
`offset` | number
`total` | number
`violations` | [Array&lt;OpsViolationResponse&gt;](OpsViolationResponse.md)

## Example

```typescript
import type { OpsPaginatedViolationsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "limit": null,
  "offset": null,
  "total": null,
  "violations": null,
} satisfies OpsPaginatedViolationsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpsPaginatedViolationsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


