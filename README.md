# Commentary

An app writing in VueJS 3, MongoDB and ExpressJS.

## Installation

You need to have MongoDB Community installed. See here [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)

Launch your MongoDB database [https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod)


Clone the repository
```bash
git clone git@github.com:bloodbee/commentary.git
```

Go to backend, install dependencies and run it
```bash
cd commentary/backend
npm install
DEBUG=commentary:* npm start
```

Go to frontend, install dependencies and run it
```bash
cd commentary/frontend
npm install
npm run serve
```

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