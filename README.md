## Introduction

This is an API named doChat-trent built on using hapi framework. Having four endpoint all are mentioned below.
These docs describe how to use the dochat API. We hope you enjoy these docs, and please don't hesitate to file an issue if you see anything missing.

## Library Used

Some of library that have been used in the doChat Api are mentioned below.

| Name |
| :--
| fcm
| mongodb
| node-trace
| JWT
| Swagger Documentation

## Authorization

All API requests require the headers. In headers there is metadata, userid, type and lang.

```
{
    metaData:null,
    "type":"Bearer",
    "userId":"5e8b3fe031ece884a6148b12",
    "userType":"userJWT"
}
```

To authenticate an API request, you should provide your data in the Authorization header.

## Http Methods And Responses

| URL-METHOD             | HEADERS                         | SUCCESS-RESPONSE             | ERROR-RESPONSE                             |
| :--------------------- | :------------------------------ | :--------------------------- | :----------------------------------------- |
| `Post interview`       | `Authenticaion: XXXX, lang: en` | `message: success`           | `message: internal-server or unauthorized` |
| `Get newInterview`     | `Authenticaion: XXXX, lang: en` | `message: success, data: []` | `message: internal-server or unauthorized` |
| `Get sentInterview`    | `Authenticaion: XXXX, lang: en` | `message: success, data: []` | `message: internal-server or unauthorized` |
| `Post interviewAnswer` | `Authenticaion: XXXX, lang: en` | `message: success`           | `message: internal-server or unauthorized` |
| `Get feed`             | `Authenticaion: XXXX, lang: en` | `message: success, data: []` | `message: internal-server or unauthorized` |

## Responses

Many API endpoints return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, doChat returns a JSON response in the following format:

```
    {
        message: string,
        status: code
    }
```

The message attribute contains a message commonly used to indicate errors or, in the case of create a resource, success that the resource was properly created.
The success attribute describes if the transaction was successful or not.

## Status Codes

doChat return the follow status code in the Api

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 401         | `Unauthorized`          |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |
