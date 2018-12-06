/*
 Json Schema
 */
module.exports.jsonSchema = {
    "id": "/user",
    "type" : "object",
            "properties" : 
            {
                title: { "type": "string",  "minLength": 2, "maxLength": 5},
                first_name: { "type": "string",  "minLength": 1, "maxLength": 120},
                last_name: { "type": "string",  "minLength": 1, "maxLength": 120},
                gender: { "type": "string",   "minLength": 1, "maxLength": 10},
                email: { "type": "string",   "minLength": 1, "maxLength": 120},
                usernmae: { "type": "string",  "minLength": 6, "maxLength": 120},
                street : { "type": "string",  "minLength": 0, "maxLength": 120},
                city : { "type": "string",  "minLength": 0, "maxLength": 120},
                state : { "type": "string",  "minLength": 0, "maxLength": 120},
                postcode : { "type": "integer",  "minLength": 1, "maxLength": 6}
            },
            "required": [
                "title",
                "first_name",
                "last_name",
                "gender",
                "email",
                "username",
                "street",
                "city",
                "state",
                "postcode"
            ]
};
