
## Location of API
Project Folder -> Web -> Routes -> Crud -> Post,Put,Delete,Get API's

## Introduction

This is an API named CRUD framework.
I hope you understand these docs, and please don't hesitate to file an issue if you see anything missing.

## Library Used
Some of library that have been used in the CRUD Api are mentioned below.

| Name |
| :--
| Joi
| mongodb
| JWT
| Swagger Documentation

## Authorization

All API requests require the headers. In headers there is metadata, userid, type and lang.

```
{
    metaData:null,
    "type":"Bearer",
    "userId":"60b5cdd875ad350a401edeb0",
    "userType":"userJWT"
}


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
