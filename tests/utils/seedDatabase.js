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

const seedDatabase = async () => {
    // delete test data
    await prisma.mutation.deleteManyUsers()

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

}

export {
    seedDatabase as
    default, userOne
}