# wot-flow
This tool is designed to create Java code for the `android-wot-servient` from a flow-based editor.

## Development
This project is built with AngularJS and NestJS.

## Usage
First thing first insert your database string in the /api/.env file
```
...
DATABASE_URL='<your_db_string>'
...
```

To run the frontend on `localhost:4200` run:
```
cd frontend
npm run start
```

To run the backend on `localhost:3001` run:
```
cd api
npm run start:dev
```
