# nockback-test

Expands on the example in [this tutorial](https://semaphoreci.com/community/tutorials/mocking-external-http-requests-in-node-tests-with-nock) that shows how to use nock to mock the github api.
This implementation uses the nockback feature to record the fixtures into seperate files. You can then run the tests against the nock mocks rather than the api.

Uses similar technique to the [nock-back-mocha](https://github.com/porchdotcom/nock-back-mocha) module, but one fixture file per test file rather than per test. Thank you to the author for sharing his code on github.

The advantage of implementing it yourself rather than use a seperate npm module is that you then have access to the most up to date version of the nock library and all the functionality.

## Install modules:

    npm install

## Generate the fixture files:
    
    npm run record

There should be 2 fixture files created in the fixtures folder.

## Run the tests:

    npm test

This will run the tests against the api and then against the mocks so you can see the difference.

1) Against the live api (2-3 seconds)
2) Against the nock mocks (30-40 milliseconds)

There are npm scripts in package.json to run the tests individually as well.
