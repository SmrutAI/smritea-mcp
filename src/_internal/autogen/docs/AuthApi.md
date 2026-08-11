# AuthApi

All URIs are relative to *http://studio.smritea.ai/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cliAuthorize**](AuthApi.md#cliauthorize) | **GET** /api/v1/cli/authorize | CLI OAuth Authorization |
| [**cliTokenExchange**](AuthApi.md#clitokenexchange) | **POST** /api/v1/cli/token | CLI OAuth Token Exchange |
| [**cliTokenRefresh**](AuthApi.md#clitokenrefresh) | **POST** /api/v1/cli/token/refresh | CLI OAuth Token Refresh |



## cliAuthorize

> CLIAuthorizeResponse cliAuthorize(clientId, redirectUri, responseType, state, codeChallenge, codeChallengeMethod)

CLI OAuth Authorization

Issues a CLI OAuth authorization code for the authenticated user

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { CliAuthorizeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // string | OAuth client ID
    clientId: clientId_example,
    // string | OAuth redirect URI
    redirectUri: redirectUri_example,
    // string | OAuth response type (must be \'code\')
    responseType: responseType_example,
    // string | OAuth state parameter for CSRF protection
    state: state_example,
    // string | PKCE code challenge
    codeChallenge: codeChallenge_example,
    // string | PKCE code challenge method
    codeChallengeMethod: codeChallengeMethod_example,
  } satisfies CliAuthorizeRequest;

  try {
    const data = await api.cliAuthorize(body);
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
| **clientId** | `string` | OAuth client ID | [Defaults to `undefined`] |
| **redirectUri** | `string` | OAuth redirect URI | [Defaults to `undefined`] |
| **responseType** | `string` | OAuth response type (must be \&#39;code\&#39;) | [Defaults to `undefined`] |
| **state** | `string` | OAuth state parameter for CSRF protection | [Defaults to `undefined`] |
| **codeChallenge** | `string` | PKCE code challenge | [Defaults to `undefined`] |
| **codeChallengeMethod** | `string` | PKCE code challenge method | [Defaults to `undefined`] |

### Return type

[**CLIAuthorizeResponse**](CLIAuthorizeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Redirect URL for the CLI callback |  -  |
| **400** | Invalid request parameters |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cliTokenExchange

> CLITokenResponse cliTokenExchange(request)

CLI OAuth Token Exchange

Exchanges authorization code for access and refresh tokens

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { CliTokenExchangeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // CLITokenRequest | Token exchange request
    request: ...,
  } satisfies CliTokenExchangeRequest;

  try {
    const data = await api.cliTokenExchange(body);
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
| **request** | [CLITokenRequest](CLITokenRequest.md) | Token exchange request | |

### Return type

[**CLITokenResponse**](CLITokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Token response |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cliTokenRefresh

> CLITokenResponse cliTokenRefresh(request)

CLI OAuth Token Refresh

Refreshes an access token using a refresh token

### Example

```ts
import {
  Configuration,
  AuthApi,
} from '';
import type { CliTokenRefreshRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthApi();

  const body = {
    // CLIRefreshTokenRequest | Token refresh request
    request: ...,
  } satisfies CliTokenRefreshRequest;

  try {
    const data = await api.cliTokenRefresh(body);
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
| **request** | [CLIRefreshTokenRequest](CLIRefreshTokenRequest.md) | Token refresh request | |

### Return type

[**CLITokenResponse**](CLITokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | New token response |  -  |
| **400** | Invalid request |  -  |
| **401** | Unauthorized |  -  |
| **409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

