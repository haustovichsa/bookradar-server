import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const mutation = {
    async login(parent, args, {
        prisma
    }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }
        return {
            user,
            token: generateToken(user.id)
        }
    },
    async createUser(parent, args, {
        prisma
    }, info) {
        const password = await hashPassword(args.data.password)

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async deleteUser(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },

    async createOwnBook(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        return await prisma.mutation.createOwnBook({
            data: {
                name: args.data.name,
                author: args.data.author,
                published_year: args.data.published_year,
                genre: args.data.genre,
                imageId: args.data.imageId,
                sharingType: args.data.sharingType,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },

    async deleteOwnBook(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);

        const ownBookExists = await prisma.exists.OwnBook({
            id: args.id,
            user: {
                id: userId
            }
        })

        if (!ownBookExists) {
            throw new Error('Enable to delete own book')
        }

        return prisma.mutation.deleteOwnBook({
            where: {
                id: args.id
            }
        }, info)
    },

    async updateOwnBook(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        const ownBookExists = await prisma.exists.OwnBook({
            id: args.id,
            user: {
                id: userId
            }
        })

        if (!ownBookExists) {
            throw new Error('Unable to update own book')
        }

        return prisma.mutation.updateOwnBook({
            where: {
                id: args.id
            },
            data: args.data
        })
    },

    async createWishBook(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        return await prisma.mutation.createWishBook({
            data: {
                name: args.data.name,
                author: args.data.author,
                genre: args.data.genre,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },

    async deleteWishBook(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request);

        const wishBookExists = await prisma.exists.WishBook({
            id: args.id,
            user: {
                id: userId
            }
        })

        if (!wishBookExists) {
            throw new Error('Enable to delete wish book')
        }

        return prisma.mutation.deleteWishBook({
            where: {
                id: args.id
            }
        }, info)
    },

    async updateWishBook(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        const wishBookExists = await prisma.exists.WishBook({
            id: args.id,
            user: {
                id: userId
            }
        })

        if (!wishBookExists) {
            throw new Error('Unable to update wish book')
        }

        return prisma.mutation.updateWishBook({
            where: {
                id: args.id
            },
            data: args.data
        })
    },
};

export {
    mutation as
    default
}