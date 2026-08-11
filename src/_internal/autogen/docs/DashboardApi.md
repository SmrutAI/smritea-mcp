# DashboardApi

All URIs are relative to *http://studio.smritea.ai/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createApiKey**](DashboardApi.md#createapikey) | **POST** /api/v1/dashboard/organizations/{orgId}/api-keys | Create API key |
| [**listApps**](DashboardApi.md#listapps) | **GET** /api/v1/dashboard/apps | List applications |



## createApiKey

> CreateAPIKeyResponse createApiKey(orgId, request)

Create API key

Create a new API key for the organization. Returns the full key value only once.

### Example

```ts
import {
  Configuration,
  DashboardApi,
} from '';
import type { CreateApiKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DashboardApi();

  const body = {
    // string | Organization ID
    orgId: orgId_example,
    // CreateAPIKeyRequest | API key creation details
    request: ...,
  } satisfies CreateApiKeyRequest;

  try {
    const data = await api.createApiKey(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orgId** | `string` | Organization ID | [Defaults to `undefined`] |
| **request** | [CreateAPIKeyRequest](CreateAPIKeyRequest.md) | API key creation details | |

### Return type

[**CreateAPIKeyResponse**](CreateAPIKeyResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden - user not member of organization |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listApps

> Array&lt;DataPlaneAppResponse&gt; listApps()

List applications

List all applications belonging to the authenticated organization

### Example

```ts
import {
  Configuration,
  DashboardApi,
} from '';
import type { ListAppsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DashboardApi();

  try {
    const data = await api.listApps();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;DataPlaneAppResponse&gt;**](DataPlaneAppResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

