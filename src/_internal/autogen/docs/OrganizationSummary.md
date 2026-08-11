
# OrganizationSummary


## Properties

Name | Type
------------ | -------------
`id` | string
`memberCount` | number
`name` | string
`plan` | string
`role` | string
`slug` | string

## Example

```typescript
import type { OrganizationSummary } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "memberCount": null,
  "name": null,
  "plan": null,
  "role": null,
  "slug": null,
} satisfies OrganizationSummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationSummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


