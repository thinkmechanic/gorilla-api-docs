# Authentication

<aside class="notice">
**Always keep your `API_KEY` and `API_SECRET` private.**
</aside>

Authenticating with the Gorilla.io API is:

* **super simple.**
* **[JSON Web Token][jwt] based.**
* **required for every request.**

You'll need your `API_KEY` and `API_SECRET` to authenticate, and getting ahold
of those is easy, just login to the [Gorilla.io App](https://app.gorilla.io)
and visit your [Account](https://app.gorilla.io/account) tab. Those credentials
should be clearly labeled on that screen.

_Note:_ We do plan to add OAUTH Authentication support in the future.

## Authenticating your Requests

> Authorization Header Format

```
Authorization: Signature {API_KEY} {SIGNATURE}
```

```http
GET /forms HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/vnd.gorilla.v1+json
Authorization: Signature 123456 abcdef
```

```ruby
# All requests with this client will be authenticated correctly
require 'gorilla-io'
client = Gorilla::Client.new(api_key, api_secret)
```

Authenticating your API requests consists simply of generating the correct
`Authorization` header for the current request.

It contains three parts:

1. The authorization type (currently, only `Signature` is supported).
2. The `API_KEY` representing the user making the request.
3. The signature of the request, generated using the `API_SECRET` for the user
   making the request. (We'll get into more detail about generating these
   signatures below).

## Signing a Request with JWT

> Example token generation using the [PHP JWT][jwt-php] library for a `GET`
> request to `https://api.gorilla.io/forms`.

```php
<?php

$apiKey    = "YOUR-API-KEY";
$apiSecret = "YOUR-API-SECRET";

// Generate a token expiring at midnight on Jan 1, 2015.
$token = JWT::encode(array(
  "exp" => strtotime("2015-01-01 00:00:00"),
  "iss" => $api_key,
  "method" => "GET",
  "path" => "/forms"
), $api_secret, 'HS256');
```

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MjAwODg0MDAsImlzcyI6IllPVVItQVBJLUtFWSIsIm1ldGhvZCI6IkdFVCIsInBhdGgiOiIvZm9ybXMifQ.n6ifGMuug2hmvtY6MxLSG6-j3Cbn4MRACJW6yz8OZUQ
```

The Gorilla.io API **requires** every request to be signed using a token
produced using the [JSON Web Token][jwt] format. There is probably already a JWT
client written in your favorite language:

<aside class="notice">
**Your JWT library must be capable of creating tokens using `HMAC` with
`SHA-256` as the signing algorithm.**
</aside>

* [**Ruby**][jwt-ruby]
* [**PHP**][jwt-php]
* [**Node**](https://github.com/auth0/node-jsonwebtoken)
* More can be found at the [JWT Website](http://jwt.io/)

### Token Parameters

The following parameters are **required** as part of your token. Order is not important.

Parameter | Type    | Description
----------|---------|------------
`exp`     | Integer | A UNIX timestamp for when this signature expires.
`iss`     | String  | Your api key as the issuer of the request.
`method`  | String  | The intended HTTP request method (eg `GET`).
`path`    | String  | The intended HTTP request path (eg `/forms`).

[jwt]: http://jwt.io/ (JSON Web Token)
[jwt-ruby]: https://github.com/progrium/ruby-jwt (Ruby JWT)
[jwt-php]: https://github.com/firebase/php-jwt (PHP JWT)
