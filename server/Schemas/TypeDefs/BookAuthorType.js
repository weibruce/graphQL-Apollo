const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const bookData = require('../../BOOK_DATA.json');
const authorData = require('../../AUTHOR_DATA.json')

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Book information',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authorData.find(author => author.id === book.authorId)
            }
        }
    })
});

module.exports.BookType = BookType;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Author information',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString)},
        books: {
            type: GraphQLList(BookType),
            resolve: (author) => {
                return bookData.filter(book => book.authorId === author.id)
            }
        }
    })
});

module.exports.AuthorType = AuthorType;