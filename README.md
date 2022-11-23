# Example of API that proxies the POD IOT API

This is an express app providing endpoints to proxy an API (POD IOT) and consume all their resources
A user gets logged into the API with basic auth to retreive the x-access-key 
An account ID should have been already created as well as username and password provided by the Company to get a successful login retriving the token (x-access-key)

[API TO PROXY](https://hummingbird-staging.podgroup.com/v3/docs/swagger/index.html)

Basically, POD is a German/Spanish Compnay which provides SIMs for IOT. One of their best customers is

[Elechtic vehicles Renting](https://www.rideyego.com/)

It includes the following files and folders:

- `config` - It is not necessary for this use case as we are using .env
- `controllers` - Contains the controllers to redirect the requests to the different services
- `db` - Contains the queries relying on Sequelize to create, read, update and delete resources
- `moiddleware` - The JWT auth mechanism to verify if x-access-token is valid. Based on a secret string
- `routes` - Contains the different routes with separation of concerns depending on the API 
- `models` - Contains the different models to create our own DB after consuming the third party API 
- `services` - Contains the different services that the API provide in order to access to the DB 
- `utils` - Payload utils to match the expected payload to be sent. It will map the values

### 1. In order to consume POD API, a restful POST endpoint api/v1/user has been created

```
{
  "username": "ivan222346737",
  "password": "1223",
  "email": "iahh@gmail.com",
  "status": "active",
  "accountId": "60fa9788-ae8e-4d7d-86b9-cb5389d0f465",
  "roles": "admin"
}
```

### 2. I reuse sendRequest function (https POST) depending on the API to consume creating the necessary payload to be sent attached to the request. DRY principle - Factory Pattern

### 3. You can sign up to register a user in my system (Postgres) and sign in to get the token (JWT). This is entirely an auth mechanism to consume our endpoints. It is not meant to authenticate on the third party API

**api/v1/signup POST** (Check if user already exists and username and password are not null and String in 

DB otherwise it will register)

```
{
    username: "string",
    password: "string"
}
```

**api/v1/signin POST**  (To get the token once DB returns user.Id)

```
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```


### 5. These features about sign up and sign in (point 4) have been tested to show how to mock a DB with sinon and stub functions

## Prerequisites and Steps

install node and postgres (if you dont want to install postgres just run npm test as it will mock the DB)

npm i

npm start

npm test

http://127.0.0.1:5001/ (HOST) Add paths and payloads as described above


## Considerations

This is a POC to achieve how to proxy and consume a third party API

Thanks, good fun! :)



