import getUserId from '../utils/getUserId'

const query = {
    searchBookByNameOrAuthor(parent, args, {
        prisma
    }, info) {
        if (args.query.length <= 3) {
            return Promise.resolve([])
        }
        const opArgs = {
            where: {
                OR: [{
                    name_contains: args.query
                },
                {
                    author_contains: args.query
                }]
            }
        }

        return prisma.query.ownBooks(opArgs, info)
    },

    users(parent, args, {
        prisma
    }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },

    me(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },

    ownBooks(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        const opArgs = {
            where: {
                user: {
                    id: userId,
                }
            }
        }

        return prisma.query.ownBooks(
            opArgs,
            info
        )
    },

    wishBooks(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        const opArgs = {
            where: {
                user: {
                    id: userId,
                }
            }
        }

        return prisma.query.wishBooks(
            opArgs,
            info
        )
    }


};

export {
    query as
    default
}