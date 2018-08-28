# nockback-test

Expands on the example in [this tutorial](https://semaphoreci.com/community/tutorials/mocking-external-http-requests-in-node-tests-with-nock) to try to achieve seperate nock fixture files.

Generate the fixture files:
    
    npm run record

Run the tests using the fixture files:

    npm test

Currently the fixtures get saved cumulatively so searchFixtures.json also contains the userFixtures.json fixtures.
