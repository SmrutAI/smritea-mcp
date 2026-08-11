
# CreditBalanceEntry


## Properties

Name | Type
------------ | -------------
`creditType` | string
`expiresAt` | string
`granted` | number
`period` | string
`remaining` | number
`used` | number

## Example

```typescript
import type { CreditBalanceEntry } from ''

// TODO: Update the object below with actual values
const example = {
  "creditType": null,
  "expiresAt": null,
  "granted": null,
  "period": null,
  "remaining": null,
  "used": null,
} satisfies CreditBalanceEntry

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreditBalanceEntry
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


