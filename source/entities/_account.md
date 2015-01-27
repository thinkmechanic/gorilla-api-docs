# Account

This object represents both the **User** making the request and the
**Account** that User belongs to.

## Retrieving Account information


> Example Request:

```http
GET /account HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/vnd.gorilla.v1+json
Authorization: Signature 123456 abcdef
```

```ruby
Gorilla::Account.fetch
```

> Example Response:

```json
{
  "user": {
    "id": 1,
    "email": "mgorilla@magilla.com",
    "first_name": "Magilla",
    "last_name": "Gorilla",
    "created_at": "2015-01-01T00:00:00.000Z",
    "account": {
      "id": 1,
      "name": "Magilla Widgets Co.",
      "created_at": "2015-01-01T00:00:00.000Z"
    }
  }
}
```

It may be confusing that this endpoint
returns a top-level `user` key instead of an `account` key, but for the purposes
of the API, the API signature represents a User, so we return information about
that user, **as well as** the account they belong to.
