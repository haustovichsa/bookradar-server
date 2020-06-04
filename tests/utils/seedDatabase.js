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

const ownBook1 = {
    input: {
        name: 'Первая любовь Повести',
        author: 'Тургенев',
        published_year: 1990,
        genre: 1,
        imageId: '15125-51512-2352355',
        sharingType: 1,
        search: 'первая любовь повести тургенев'
    },
    ownBook: undefined
}

const ownBook2 = {
    input: {
        name: 'Отцы и дети',
        author: 'Иван Тургенев',
        published_year: 1990,
        genre: 1,
        imageId: '15125-51512-745737',
        sharingType: 1,
        search: 'отцы и дети иван тургенев'
    },
    ownBook: undefined
}

const ownBook3 = {
    input: {
        name: 'Война и мир',
        author: 'Толстой',
        published_year: 1990,
        genre: 1,
        imageId: '15125-51512-5253666',
        sharingType: 1,
        search: 'война и мир толстой'
    },
    ownBook: undefined
}

const ownBook4 = {
    input: {
        name: 'Война и мир',
        author: 'Лев Толстой',
        published_year: 1990,
        genre: 1,
        imageId: '15125-51512-5253666',
        sharingType: 1,
        search: 'война и мир лев толстой'
    },
    ownBook: undefined
}

const wishBookOne = {
    input: {
        name: 'book one',
        author: 'book one author',
        genre: 1,
    },
    wishBook: undefined
}

const seedDatabase = async () => {
    jest.setTimeout(20000);
    // delete test data
    await prisma.mutation.deleteManyUsers()
    await prisma.mutation.deleteManyWishBooks()
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


    // CRATE OWN BOOKS
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

    // create own book1
    ownBook1.ownBook = await prisma.mutation.createOwnBook({
        data: {
            ...ownBook1.input,
            user: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    // create own book2
    ownBook2.ownBook = await prisma.mutation.createOwnBook({
        data: {
            ...ownBook2.input,
            user: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    // create own book3
    ownBook3.ownBook = await prisma.mutation.createOwnBook({
        data: {
            ...ownBook3.input,
            user: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    // create own book4
    ownBook4.ownBook = await prisma.mutation.createOwnBook({
        data: {
            ...ownBook4.input,
            user: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    // CREATE WISH BOOK
     // create wish book one
     wishBookOne.wishBook = await prisma.mutation.createWishBook({
        data: {
            ...wishBookOne.input,
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
    default, userOne, userTwo, ownBookOne, wishBookOne, ownBook1, ownBook2, ownBook3
}