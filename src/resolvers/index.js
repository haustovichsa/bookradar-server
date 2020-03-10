import {
    extractFragmentReplacements
} from 'prisma-binding'
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';
import OwnBook from './OwnBook'
import WishBook from './WishBook'
const resolvers = {
    Query,
    Mutation,
    // Subscription,
    User,
    OwnBook,
    WishBook,
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export {
    resolvers,
    fragmentReplacements
}