const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./Schemas');

const app = express();
const PORT = 6969;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(PORT, () => {
    console.log('Server Running')
});