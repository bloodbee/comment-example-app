# Commentary

An app writing in VueJS 3, MongoDB and ExpressJS.

## Installation

You need to have MongoDB Community installed. See here [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)

Launch your MongoDB database [https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod)


Clone the repository
```bash
git clone git@github.com:bloodbee/commentary.git
```

Go to backend, install dependencies, run initDb script and run express server
```bash
cd commentary/backend
npm install
npm run init:db # initialize database
DEBUG=commentary:* npm start # run express server
```

Go to frontend, install dependencies and run it
```bash
cd commentary/frontend
npm install
npm run serve
```

You can now log in with two users :
- Admin : admin@email.com / adminpassword
- Basic : user@email.com / userpassword

## Testing
You can launch the test suite for the backend
```bash
cd commentary/backend
# unit tests
npm run test
# unit tests + coverage
npm run test:coverage
```

You can launch the test suite for the frontend
```bash
cd commentary/frontend
# unit tests
npm run test:unit
# unit tests + coverage
npm run test:unit:coverage
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Any inquiries at mathieu@bloodbee.space

## License
[MIT](https://choosealicense.com/licenses/mit/)