# Merge

A **Merge** represents a real document that has been created as a result of
supplying a previously created [form][form] a hash of data mapped to fillable
fields in the form.

## The merge object

## The form object

> Example Data:

```json
{
  "id": "mrg_21e1df27020b5f",
  "account_id": "act_1988a58e3dedab",
  "title": "Form 1099",
  "status": "processed",
  "size": 1024,
  "original_file_name": "1099.pdf",
  "created_at": "2015-01-01T00:00:00.000Z",
  "fields": [
    {
      "id": "fld_f1e30ff88db161",
      "form_id": "frm_21e1df27020b5f",
      "field_name": "Your_First_Name_Here",
      "api_field_name": "first_name"
    },
    {
      "id": "fld_10aa8c812d14dc",
      "field_name": "Your_Last_Name_Here",
      "api_field_name": "last_name"
    }
  ]
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
`fields` | Array | List of Field objects detected in the form.
