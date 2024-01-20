# wot-flow
This tool is designed to create Java code for the `android-wot-servient` from a flow-based editor.

## Development
This project is built with AngularJS and NestJS.\
It relies on `zion`, a WoT TDD implementation (https://github.com/vaimee/zion).

## Usage
First thing first clone the repository and insert your database string in the /api/.env file
```
...
DATABASE_URL='<your_db_string>'
...
```

### docker compose
Start wot-flow with the following command:
```
docker compose up
```

### npm
The frontend proxying is currently set for the docker-compose deploying, to use npm you can change the `./proxy.conf.json` file applying the following edits:

```
{
    "/zion": {
        "target": "http://localhost:3000/",
        "secure": false,
        "changeOrigin": true,
        "protocol": "http",
        "pathRewrite": {"^/zion" : ""}
    },
    "/api": {
        "target": "http://localhost:3001/",
        "secure": false,
        "changeOrigin": true,
        "protocol": "http",
        "pathRewrite": {"^/api" : ""}
    }
}
```

To run the Zion TDD on `localhost:3000` start Docker and run:
```
cd zion
npm ci
npm start
```

To run the frontend on `localhost:4200` run:
```
cd frontend
npm run start
```

To run the backend on `localhost:3001` run:
```
cd api
npm run start
```
