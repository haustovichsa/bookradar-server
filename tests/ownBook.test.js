import 'cross-fetch/polyfill'
import '@babel/polyfill/noConflict'
import prisma from '../src/prisma'
import seedDatabase, {
    userOne,
    ownBookOne,
} from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
    createOwnBook,
    deleteOwnBook,
    updateOwnBook,
} from './utils/operations'
import {
    extractFragmentReplacements
} from 'prisma-binding'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new own book', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        data: {
            name: 'book name',
            author: 'book author',
            published_year: 1990,
            genre: 1,
            imageId: '1451252125',
            sharingType: 1,
        }
    }

    const {
        data
    } = await client.mutate({
        mutation: createOwnBook,
        variables
    })

    expect(data.createOwnBook.name).toBe('book name');
    expect(data.createOwnBook.author).toBe('book author');
    expect(data.createOwnBook.published_year).toBe(1990);
    expect(data.createOwnBook.genre).toBe(1);
    expect(data.createOwnBook.imageId).toBe('1451252125');
    expect(data.createOwnBook.sharingType).toBe(1);
    expect(1).toBe(1);
})

test('should be able update own book', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        id: ownBookOne.ownBook.id,
        data: {
            name: 'updated name',
            author: 'updated author',
            published_year: 2020,
            genre: 10,
            sharingType: 11,
            imageId: 'updated image'
        }
    }

    const {
        data
    } = await client.mutate({
        mutation: updateOwnBook,
        variables
    })
    const exists = await prisma.exists.OwnBook({
        id: ownBookOne.ownBook.id,
        name: 'updated name',
        author: 'updated author',
        published_year: 2020,
        genre: 10,
        sharingType: 11,
        imageId: 'updated image'
    })

    expect(data.updateOwnBook.name).toBe('updated name')
    expect(data.updateOwnBook.author).toBe('updated author')
    expect(data.updateOwnBook.published_year).toBe(2020)
    expect(data.updateOwnBook.genre).toBe(10)
    expect(data.updateOwnBook.sharingType).toBe(11)
    expect(data.updateOwnBook.imageId).toBe('updated image')


    expect(exists).toBe(true)
})

test('should delete own book', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        id: ownBookOne.ownBook.id
    }

    await client.mutate({
        mutation: deleteOwnBook,
        variables
    })

    const exists = await prisma.exists.OwnBook({
        id: ownBookOne.ownBook.id
    })

    expect(exists).toBe(false)
})