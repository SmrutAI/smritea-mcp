
# PlanChangePreviewResponse


## Properties

Name | Type
------------ | -------------
`action` | string
`blocked` | [PlanChangeBlockedPreview](PlanChangeBlockedPreview.md)
`cancelToFree` | [PlanChangeCancelToFreePreview](PlanChangeCancelToFreePreview.md)
`create` | [PlanChangeCreatePreview](PlanChangeCreatePreview.md)
`currency` | string
`downgrade` | [PlanChangeDowngradePreview](PlanChangeDowngradePreview.md)
`noop` | [PlanChangeNoopPreview](PlanChangeNoopPreview.md)
`resumeAuth` | [PlanChangeResumeAuthPreview](PlanChangeResumeAuthPreview.md)
`targetPlanKey` | string
`targetPlanName` | string
`upgrade` | [PlanChangeUpgradePreview](PlanChangeUpgradePreview.md)

## Example

```typescript
import type { PlanChangePreviewResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "action": null,
  "blocked": null,
  "cancelToFree": null,
  "create": null,
  "currency": null,
  "downgrade": null,
  "noop": null,
  "resumeAuth": null,
  "targetPlanKey": null,
  "targetPlanName": null,
  "upgrade": null,
} satisfies PlanChangePreviewResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlanChangePreviewResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


