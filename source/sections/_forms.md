# Forms

The **Form** object represents a form template uploaded to your account that can
be re-used when creating merges.

## Creating a Form

When creating a **Form**, it will respond with a `pending` status almost 99.99%
of the time. That's because forms and their fields are processed in a background
queue and that may not happen immediately. For the same reason, the `fields`
object returned when creating a form will almost always be an empty array.

> Example Request:

```http
POST /forms HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/json
Authorization: Signature 123456 abcdef
Content-type: multipart/form-data, boundary=--XXXXXX
Content-Length: 1024

--XXXXXX
Content-Disposition: form-data; name="title"

Form 1099
--XXXXX
Content-Disposition: form-data; name="document"; filename="1099.pdf"
Content-Type: application/pdf

{Contents of 1099.pdf}
--XXXXXX
```

```ruby
Gorilla::Form.create(title: 'Form 1099') do |form|
  form.upload File.read('1099.pdf')
end
```

> Example Response:

```json
{
  "form": {
    "id": "21e1df27020b5fb4",
    "title": "Form 1099",
    "status": "pending",
    "size": 1024,
    "original_file_name": "1099.pdf",
    "created_at": "2015-01-01T00:00:00.000Z",
    "fields": []
  }
}
```

### Supported Formats

Currently, we only support **PDF** documents with a set of fields that can be
filled programmatically. Support is coming for more advanced document types,
but for now, all other documents will be considered invalid.

### Params

| Name | Type | Required | Desc |
|------|------|----------|------|
| `document` | File | **Yes** | The form template. |
| `title` | String | No | The custom document title. |


## Retrieving a Form

> Example Request:

```http
GET /forms/{id} HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/json
Authorization: Signature 123456 abcdef
```

```ruby
form = Gorilla::Form.find('21e1df27020b5fb4')
```

> Example Response:

```json
{
  "form": {
    "id": "21e1df27020b5fb4",
    "title": "New Form Title",
    "status": "processed",
    "size": 1024,
    "original_file_name": "1099.pdf",
    "created_at": "2015-01-01T00:00:00.000Z",
    "fields": [
      {
        "id": 123,
        "field_name": "Your_First_Name_Here",
        "api_field_name": "first_name"
      },
      {
        "id": 124,
        "field_name": "Your_Last_Name_Here",
        "api_field_name": "last_name"
      }
    ]
  }
}
```

## Updating a Form

> Example Request:

```http
PUT /forms/{id} HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/json
Authorization: Signature 123456 abcdef
Content-type: application/json

{
  "title": "New Form Title"
}
```

```ruby
form = Gorilla::Form.find('21e1df27020b5fb4')
form.save!(title: 'New Form Title')

# Or..
Gorilla::Form.update!('21e1df27020b5fb4', {
  title: 'New Form Title'
})
```

> Example Response:

```json
{
  "form": {
    "id": "21e1df27020b5fb4",
    "title": "New Form Title",
    "status": "processed",
    "size": 1024,
    "original_file_name": "1099.pdf",
    "created_at": "2015-01-01T00:00:00.000Z",
    "fields": [
      {
        "id": 123,
        "field_name": "Your_First_Name_Here",
        "api_field_name": "first_name"
      },
      {
        "id": 124,
        "field_name": "Your_Last_Name_Here",
        "api_field_name": "last_name"
      }
    ]
  }
}
```

### Params

| Name | Type | Required | Desc |
|------|------|----------|------|
| `title` | String | No | The custom document title. |
