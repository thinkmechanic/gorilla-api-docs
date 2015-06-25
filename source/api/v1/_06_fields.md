# Field

The **Field** object represents a fillable field element detected in a valid
[Form][form].

## The field object

> Example Data:

```json
{
  "id": "fld_10aa8c812d14dc",
  "form_id": "frm_21e1df27020b5f",
  "field_name": "Your_First_Name_Here",
  "api_field_name": "first_name"
}
```

### Attributes

Name | Type | Description
-----|------|-------------
`id` | String | The unique field id.
`form_id` | String | The unique id for the [form][form] this field belongs to.
`field_name` | String | The name of the field as defined in the uploaded form.
`api_field_name` | String | The key used when merging data into this field via a [merge]. (Defaults to `field_name`).


## Updating a field

> Example Request:

```http
PUT /forms/frm_21e1df27020b5f/fields/fld_10aa8c812d14dc HTTP/1.1
User-Agent: Magilla/1.0.0
Accept: application/json
Authorization: Signature 123456 abcdef
Content-type: application/json

{
  "api_field_name": "spouse_first_name"
}
```

```ruby
form = Gorilla::Form.find('frm_21e1df27020b5f')
field = form.fields[ 'fld_10aa8c812d14dc']
field.save!(api_field_name: 'spouse_first_name')

# Or..
Gorilla::Field.update!('fld_f1e30ff88db161', {
  api_field_name: 'spouse_first_name'
})
```

> Example Response:

```json
{
  "field": {
    "id": "fld_10aa8c812d14dc",
    "form_id": "frm_21e1df27020b5f",
    "field_name": "Your_First_Name_Here",
    "api_field_name": "spouse_first_name"
  }
}
```

Updates the details of a field that has previously been parsed out of a
[form][form] object. Supply the unique field id returned from a previous request
along with any of the permitted parameters.

### Params

 Name | Type | Required | Desc
------|------|----------|------
`api_field_name` | String | **Yes** | The new field name to use during [merges][merge].

### Returns

The updated field object.

Code | Description
-----|-------------
`200` | The field was updated.

[merge]: #merge

[form]: #form
[merge]: #merge
[errors]: #error-responses
