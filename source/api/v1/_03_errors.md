# Errors

Gorilla.io uses basic HTTP response codes to indicate success or failure of a
request. For the most part, codes in the `2xx` range indicate a success, codes
in the `4xx` range indicate a failure due to the information provided by the
client, and codes in the `5xx` range indicate a server error on our part.

## Error Responses

```json
{
  "error": {
    "type": "not_found_error",
    "message": "The object you requested could not be found".
  }
}
```

Whenever possible, we will return an `error` object in the JSON response
containing the following attributes:

Attribute | Description
----------|-------------
`type` | The type of error. See our error types for more info.
`message` | A human-readable message describing the error.

## Standard Errors

Type | Code | Description
-----|------|-------------
`authentication_error` | `401` | We could not authenticate the request.
`authorization_error` | `401` | We were able to authenticate you, but you do not have permission for that request.
`not_found_error` | `404` | The object requested could not be found.
`validation_error` | `422` | The parameters supplied for this particular request are invalid.

## Validation Errors

```json
{
  "error": {
    "type": "validation_error",
    "message": {
      "title": [
        "cannot be blank"
      ]
    }
  }
}
```

If your request receives a response code of `422`, this means that the
parameters you supplied during the request were invalid. This will typically
only be an issue when creating and updating objects via the API.

A validation error response will always have its `type` set to
`validation_error`, and the `message` object has keys mapped to the parameters
submitted during the request, with the values of those keys being an array of
partial error messages.
