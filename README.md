# API Rate Limiting
I made an API with node & typescript
- sign up
- login
- get the current time

The API is rate-limited and uses Redis to check how many requests you've made. After a certain amount of requests, you'll get a `429` until the time limit has expired, at which point you can request again

## Setup
0. install packages
> npm install
1. ensure .env is created
> make setup-env
2. run the app
> make up
3. Frontend runs on `localhost:4040`

## Implementation
check out the API service for the details.

## ToDo
- [ ] add time until next release
- [ ] refactor app.ts to be in api folder
- [ ] write a real README
- [ ] unit tests
- [ ] clean up `models` directory