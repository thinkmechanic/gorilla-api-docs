# Authentication

> To authorize, use this code:

```shell
# With a shell, pass the correct headers with each request
curl "https://api.gorilla.io/forms.json" \
  -H "Auth-Account-Id: {{AccountId}}" \
  -H "Auth-Api-Key: {{UserApiKey}}"
```

```ruby
Gorilla.configure do |config|
  config.account_id = "your-account-id"
  config.api_key = "user-api-key"
end

# Or..
Gorilla::Client.new(account_id, api_key)
```

1. Login to the [Gorilla.io](https://gorilla.io) and visit the
[Account](https://app.gorilla.io/account) tab.

2. There you will see your `Account ID` and your `API Key`. Grab those.

3. Use your favorite language to provide those credentials with every request
   via the authorization headers.

### Authorization Headers

Header            | Description
----------------- | ----------------------------------
`Auth-Account-Id` | The ID for your Account (eg: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
`Auth-Api-Key`    | The API key associated with the user making the request.
