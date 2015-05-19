# Forms

The **Form** object represents a form template uploaded to your account that can
be re-used using when creating merges.

## Creating a Form

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
    "id": "e65b200e69c3afaa9e5704a363932d72",
    "title": "Form 1099",
    "status": "pending",
    "size": 1024,
    "original_file_name": "1099.pdf",
    "created_at": "2015-01-01T00:00:00.000Z"
  }
}
```
