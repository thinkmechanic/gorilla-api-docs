# Form

The **Form** object represents a form template uploaded to your account that can
be re-used when creating merges.

## The form object

```json
{
  "form": {
    "id": "21e1df27020b5fb4",
    "account_id": 123,
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

### Attributes

Name | Type | Description
-----|------|-------------
`id` | String | The unique form id.
`account_id` | String | The id for the [account][account] this form belongs to.
`title` | String | The user supplied form title.
`status` | String | The form processing status. Will be one of `pending`, `errored`, `processed`, or `archived`
`size` | Integer | The size of the form in bytes.
`original_file_name` | String | The name of the file as it was uploaded.
`created_at` | Time | The date the form was created.
`fields` | Array | List of fields detected in the form.


## Creating a form

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
    "account_id": 123,
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
detected and filled programmatically. All other documents, including PDF files
without any fillable fields, will be considered invalid.

### Params

 Name | Type | Required | Desc
------|------|----------|------
`document` | File | **Yes** | The form itself.
`title` | String | No | A custom document title.
`notify_url` | String | No | A webhook compatible URL to receive processing event notifications.

### Returns

A form object given a valid attributes, otherwise it returns an
[error object][errors].

## Retrieving a form

Retrieves the details of a form that has previously been created. Supply the
unique form id returned from a previous request and the API will return details
about the form.

> Example Request:

```http
GET /forms/21e1df27020b5fb4 HTTP/1.1
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
    "account_id": 123,
    "title": "New Form Title",
    "status": "processed",
    "size": 1024,
    "original_file_name": "1099.pdf",
    "created_at": "2015-01-01T00:00:00.000Z",
    "fields": [
      {
        "id": 123,
        "form_id": "21e1df27020b5fb4",
        "field_name": "Your_First_Name_Here",
        "api_field_name": "first_name"
      },
      {
        "id": 124,
        "form_id": "21e1df27020b5fb4",
        "field_name": "Your_Last_Name_Here",
        "api_field_name": "last_name"
      }
    ]
  }
}
```

### Params

Name | Type | Required | Desc
------|------|----------|------
`id` | String | **Yes** | The unique form id.

### Returns

A form object given a valid id, otherwise it returns an [error object][errors].

## Updating a form

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
    "account_id": 123,
    "title": "New Form Title",
    "status": "processed",
    "size": 1024,
    "original_file_name": "1099.pdf",
    "created_at": "2015-01-01T00:00:00.000Z",
    "fields": [
      {
        "id": 123,
        "form_id": "21e1df27020b5fb4",
        "field_name": "Your_First_Name_Here",
        "api_field_name": "first_name"
      },
      {
        "id": 124,
        "form_id": "21e1df27020b5fb4",
        "field_name": "Your_Last_Name_Here",
        "api_field_name": "last_name"
      }
    ]
  }
}
```

### Params

 Name | Type | Required | Desc
------|------|----------|------
`title` | String | No | The custom document title.

## List all forms

Returns a list of forms you've already created. The forms are returned in sorted
order, with the most recently created forms appearing first.

> Example Request:

```http
GET /forms HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/json
Authorization: Signature 123456 abcdef
Content-type: application/json
```

```ruby
forms = Gorilla::Form.all

# or
forms = Gorilla::Form.all(page: 2)
```

> Example Response:

```json
{
  "meta": {
    "total_entries": 20,
    "total_pages": 2,
    "current_page": 1,
    "per_page": 10
  },
  "forms": [
    {
      "id": "21e1df27020b5fb4",
      "account_id": 123,
      "title": "New Form Title",
      "status": "processed",
      "size": 1024,
      "original_file_name": "1099.pdf",
      "created_at": "2015-01-01T00:00:00.000Z",
      "fields": [
        {
          "id": 123,
          "form_id": "21e1df27020b5fb4",
          "field_name": "Your_First_Name_Here",
          "api_field_name": "first_name"
        },
        {
          "id": 124,
          "form_id": "21e1df27020b5fb4",
          "field_name": "Your_Last_Name_Here",
          "api_field_name": "last_name"
        }
      ]
    }
  ]
}
```

### Params

Name | Type | Required | Default | Description
-----|------|----------|---------|-------------
`page` | Integer | No | `1` | The page number to retrieve.
`per_page` | Integer | No | `10` | The number of forms per page (range: `1-50`).

[account]: #account
[errors]: #error-responses
