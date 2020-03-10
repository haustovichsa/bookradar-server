import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'
import jwt from 'jsonwebtoken'

const userOne = {
    input: {
        name: 'Pavel Chan',
        email: 'PavelChan@gmail.com',
        password: bcrypt.hashSync('Qwerty12')
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Andrey Chan',
        email: 'AndreyChan@gmail.com',
        password: bcrypt.hashSync('Qwerty12')
    },
    user: undefined,
    jwt: undefined
}

const ownBookOne = {
    input: {
        name: 'book one',
        author: 'book one author',
        published_year: 1990,
        genre: 1,
        imageId: '15125-51512-25152521',
        sharingType: 1,
    },
    ownBook: undefined
}

const seedDatabase = async () => {
    // delete test data
    await prisma.mutation.deleteManyUsers()
    await prisma.mutation.deleteManyOwnBooks()

    // create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })

    userOne.jwt = jwt.sign({
        userId: userOne.user.id
    }, process.env.JWT_SECRET)

    // create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })

    userTwo.jwt = jwt.sign({
        userId: userTwo.user.id
    }, process.env.JWT_SECRET)


    // create own book one
    ownBookOne.ownBook = await prisma.mutation.createOwnBook({
        data: {
            ...ownBookOne.input,
            user: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
}

export {
    seedDatabase as
    default, userOne, ownBookOne
}