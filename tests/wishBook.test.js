import 'cross-fetch/polyfill'
import '@babel/polyfill/noConflict'
import prisma from '../src/prisma'
import seedDatabase, {
    userOne,
    wishBookOne,
} from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
    createWishBook,
    deleteWishBook,
    updateWishBook,
} from './utils/operations'
import {
    extractFragmentReplacements
} from 'prisma-binding'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new wish book', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        data: {
            name: 'book name',
            author: 'book author',
            genre: 1,
        }
    }

    const {
        data
    } = await client.mutate({
        mutation: createWishBook,
        variables
    })

    expect(data.createWishBook.name).toBe('book name');
    expect(data.createWishBook.author).toBe('book author');
    expect(data.createWishBook.genre).toBe(1);
})

test('should be able update wish book', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        id: wishBookOne.wishBook.id,
        data: {
            name: 'updated name',
            author: 'updated author',
            genre: 10,
        }
    }

    const {
        data
    } = await client.mutate({
        mutation: updateWishBook,
        variables
    })
    const exists = await prisma.exists.WishBook({
        id: wishBookOne.wishBook.id,
        name: 'updated name',
        author: 'updated author',
        genre: 10,
    })

    expect(data.updateWishBook.name).toBe('updated name')
    expect(data.updateWishBook.author).toBe('updated author')
    expect(data.updateWishBook.genre).toBe(10)

    expect(exists).toBe(true)
})

test('should delete wish book', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        id: wishBookOne.wishBook.id
    }

    await client.mutate({
        mutation: deleteWishBook,
        variables
    })

    const exists = await prisma.exists.WishBook({
        id: wishBookOne.wishBook.id
    })

    expect(exists).toBe(false)
})