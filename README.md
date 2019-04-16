# Documentation for "flg_framework"

## Mysql installs

- By default you can create install files in next path:

```
install/bd/mysql/
```

```
...

module.exports.installDir = 'install/db/mysql/';

...
```

- File name must start with "**Install_#1_#2**"
(#1 - number of install file; #2 - description)
```
Example:

"Install_001_CreateUserTable.js"
```

- Main file content:
```
let AbstractInstallService = require('../../../core/db/mysql/AbstractInstallService.js');

class CreateUserTable extends AbstractInstallService
{
    constructor()
    {
        super();

        this.query = [
            'mysql_query1',
            'mysql_query2',
            ...
        ];
        
        this.queryData = [
            [
                'mysql_query1_value1',
                'mysql_query1_value2',
                ...
            ],
            [
                'mysql_query2_value1',
                'mysql_query2_value2',
                ...
            ],
        ];
    }
}

module.exports = CreateUserTable;
```

**this.query** - [array] - list of queries

**this.queryData** - [array of arrays] - list of variables for query list (optional)




#Routes:

##User API : 
**GET /api/users/companies/**  
Get company personal information.

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/companies",
  "method": "GET",
  "headers": {
    "x-solt": "JWT token here",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "companyInfo": {
        "id": 2,
        "email": "mymail@ukr.net",
        "country": "Ukraine",
        "address": "Ternopil",
        "phone": "+380673515035",
        "site": "www.fulg0re.com",
        "position": "I am CEO",
        "representative_name": "fulg0re company",
        "company_name": "fulg0re Inc.",
        "description": "some description",
        "type": 2,
        "confirmed": 1,
        "created": "2019-01-28T07:58:44.000Z"
    }
}
```
-----------------------------------------------------------------------------------------------
**PUT /api/users/companies/**  
To update user information. 

**Optional:** 
>**city** - `string`, up to 150 characters

>**country** - `string`, up to 150 characters

>**address** - `string`, up to 255 characters

>**phone** - `string`, up to 20 characters

>**site** - `string`, up to 255 characters

>**position** - `string`, up to 255 characters

>**representative_name** - `string`, up to 255 characters

>**description** - `text`

>**password** - `string`, string. up to 255 characters

>**old_password** - `string`, string. up to 255 characters

**NOTE**
> For password change we require two extra fields, **password** and **old_password**

> If update query will have 0 values to update. You will receive 304 http code.

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/companies/",
  "method": "PUT",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
    "city": "some city",
    "country": "some country",
    "address": "some address",
    "phone": "+380998887766",
    "site": "www.somesite.com",
    "position": "CEO",
    "representative_name": "some representative name",
    "description": "some description",
    "password": "333",
    "old_password": "333"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Company updated."
}
```
------------------------------------------------------------------------------------------------
**GET /api/users/developers/**  
Get company developers personal information.

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/",
  "method": "GET",
  "headers": {
    "x-solt": "JWT token here",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "companyDevelopers": [
        {
            "developer_id": 2,
            "company_id": 2,
            "name": "some guy",
            "country": "Germany",
            "photo": "default.png",
            "experience": 0,
            "education": null,
            "rate": 0,
            "discount": 0,
            "on_bench": 0,
            "skills": [
                {
                    "skill_name": "Node Js",
                    "skill_experience": "15"
                },
                {
                    "skill_name": "MySQL",
                    "skill_experience": "11"
                }
            ],
            "languages": [
                {
                    "language_short_name": "UA",
                    "language_full_name": "Ukrainian"
                },
                {
                    "language_short_name": "US",
                    "language_full_name": "US american"
                }
            ]
        }
    ]
}
```

**NOTE**
> IF no variables in url, in response will be all company developers

> IF in url pass 'developer_id', in response will be one company developer

-----------------------------------------------------------------------------------------------
**POST /api/users/developers/**  
Insert company new developer

**Optional:** 
>**name** - `string`, up to 255 characters

>**country** - `string`, up to 75 characters

>**photo** - `string`, up to 255 characters

>**experience** - `integer`, up to 3 characters

>**education** - `string`, up to 255 characters

>**rate** - `integer`, up to 5 characters

>**discount** - `integer`, up to 3 characters

>**on_bench** - `integer`, up to 4 characters

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "name": "some name",
      "country": "some country",
      "photo": "some_photo.png",
      "experience": 5,
      "education": "high education",
      "rate": 3,
      "discount": 35,
      "on_bench": 3
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Developer added."
}
```

-----------------------------------------------------------------------------------------------
**PUT /api/users/developers/**  
Update company developer personal information.
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/",
  "method": "PUT",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 2
      "name": "some name",
      "country": "some country",
      "photo": "some_photo.png",
      "experience": 5,
      "education": "high education",
      "rate": 3,
      "discount": 35,
      "on_bench": 3
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Developer updated."
}
```

**NOTE**
> IF you send not existing field, it will be ignored

> Field 'developer_id' and at least one existing field is required

-----------------------------------------------------------------------------------------------
**DELETE /api/users/developers/**  
Delete developer.
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/",
  "method": "DELETE",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 7
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Developer removed."
}
```

**NOTE**
> Field 'developer_id' is required.

-----------------------------------------------------------------------------------------------
**GET /api/users/developers/skills**  
Get list of all skills.
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/skills",
  "method": "GET",
  "headers": {
    "x-solt": "JWT token here",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "result": [
        {
            "skill_id": 1,
            "skill_name": "Node Js"
        },
        {
            "skill_id": 2,
            "skill_name": "MySQL"
        },
        {
            "skill_id": 3,
            "skill_name": "PHP"
        }
    ]
}
```
-----------------------------------------------------------------------------------------------
**POST /api/users/developers/skills**  
Insert new skill for developer

**Optional:** 
>**developer_id** - `integer`, up to 8 characters

>**skill_id** - `integer`, up to 5 characters

>**experience** - `integer`, up to 3 characters

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/skills",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 2,
      "skill_id": 3,
      "experience": 8
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Skill added to developer."
}
```

**NOTE**
> IF developer have already this skill, you will get next response(status 400).
```
{
    "error": "This developer already have this skill"
}
```

-----------------------------------------------------------------------------------------------
**PUT /api/users/developers/skills**  
Update developer skill experience

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/skills",
  "method": "PUT",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 2,
      "skill_id": 3,
      "experience": 8
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Developer skill experience updated."
}
```
-----------------------------------------------------------------------------------------------
**DELETE /api/users/developers/skills**  
Delete skill from developer.
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/skills",
  "method": "DELETE",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 3,
      "skill_id": 7
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Skill deleted from developer."
}
```

**NOTE**
> Fields 'developer_id' and 'skill_id' is required.

-----------------------------------------------------------------------------------------------
**GET /api/users/developers/languages**  
Get list of all languages.
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/languages",
  "method": "GET",
  "headers": {
    "x-solt": "JWT token here",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "result": [
        {
            "skill_id": 1,
            "skill_name": "Node Js"
        },
        {
            "skill_id": 2,
            "skill_name": "MySQL"
        },
        {
            "skill_id": 3,
            "skill_name": "PHP"
        }
    ]
}
```
-----------------------------------------------------------------------------------------------
**POST /api/users/developers/languages**  
Insert new language for developer

**Optional:** 
>**developer_id** - `integer`, up to 8 characters

>**language_id** - `integer`, up to 5 characters

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/languages",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 2,
      "language_id": 3
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Language added to developer."
}
```

**NOTE**
> IF developer have already this language, you will get next response(status 400).
```
{
    "error": "This developer already have this language"
}
```

-----------------------------------------------------------------------------------------------
**DELETE /api/users/developers/languages**  
Delete language from developer.
```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/developers/languages",
  "method": "DELETE",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "developer_id": 3,
      "language_id": 7
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "message": "Language deleted from developer."
}
```

**NOTE**
> Fields 'developer_id' and 'language_id' is required.

-----------------------------------------------------------------------------------------------
**POST /api/users/upload**  
Update company logo or developer photo.

**Optional:** 
>**developer_id** - `integer`, up to 8 characters

>**file** - file extension must be one of (jpg, jpeg, png, gif)

```
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/api/users/upload",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "x-solt": "JWT token here"
  },
  "data": {
      "file": file goes here,
      "developer_id": 3
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
**On response return JSON object**
```
{
    "fileName": "a7a14cd6-932a-55e4-bbc0-f4c39a4a6d9f.png",
    "filePath": "/public/img/a7a14cd6-932a-55e4-bbc0-f4c39a4a6d9f.png"
}
```

**NOTE**
> Developer(developer_id) not in company, you get an error (status - 400).
```
{
    "error": "Developer not in company"
}
```

> If file have wrong extension, you get an error (status - 415).
```
{
    "error": "Invalid file extension"
}
```

-----------------------------------------------------------------------------------------------
