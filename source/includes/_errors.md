# Errors

Gorilla.io uses basic HTTP response codes to indicate success or failure of a
request. For the most part, codes in the `2xx` range indicate a success, codes
in the `4xx` range indicate a failure due to the information provided by the
client, and codes in the `5xx` range indicate a server error on our part.

## Error Responses

```json
{
  "error": {
    "type": "validation_error",
    "message": {
      "name": "is required"
    }
  }
}
```

Whenever possible, we will return an `error` object in the JSON response
containing the following attributes:

Attribute | Description
----------|-------------
`type` | The type of error. See our error types for more info.
`message` | A human-readable message describing the error.
