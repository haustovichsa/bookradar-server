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
            name: 'book Name',
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

    expect(data.createOwnBook.name).toBe('book Name');
    expect(data.createOwnBook.author).toBe('book author');
    expect(data.createOwnBook.published_year).toBe(1990);
    expect(data.createOwnBook.genre).toBe(1);
    expect(data.createOwnBook.imageId).toBe('1451252125');
    expect(data.createOwnBook.sharingType).toBe(1);

    const book = await prisma.query.ownBook({
        where: {
            id: data.createOwnBook.id
        }
    })
   
    expect(book.search).toBe('book name book author');
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
        imageId: 'updated image',
        search: 'updated name updated author'
    })

    expect(exists).toBe(true)
    expect(data.updateOwnBook.name).toBe('updated name')
    expect(data.updateOwnBook.author).toBe('updated author')
    expect(data.updateOwnBook.published_year).toBe(2020)
    expect(data.updateOwnBook.genre).toBe(10)
    expect(data.updateOwnBook.sharingType).toBe(11)
    expect(data.updateOwnBook.imageId).toBe('updated image')
})

test('should be updated search field', async () => {
    const client = getClient(userOne.jwt)

    let variables = {
        id: ownBookOne.ownBook.id,
        data: {
            name: 'first name',
            author: 'first author'
        }
    }

    await client.mutate({
        mutation: updateOwnBook,
        variables
    })
    let exists = await prisma.exists.OwnBook({
        id: ownBookOne.ownBook.id,
        name: 'first name',
        author: 'first author',
        search: 'first name first author'
    })

    expect(exists).toBe(true)

    variables = {
        id: ownBookOne.ownBook.id,
        data: {
            name: 'second name',
        }
    }

    await client.mutate({
        mutation: updateOwnBook,
        variables
    })

    exists = await prisma.exists.OwnBook({
        id: ownBookOne.ownBook.id,
        name: 'second name',
        search: 'second name first author'
    })

    expect(exists).toBe(true)

    variables = {
        id: ownBookOne.ownBook.id,
        data: {
            author: 'third author'
        }
    }

    await client.mutate({
        mutation: updateOwnBook,
        variables
    })
    exists = await prisma.exists.OwnBook({
        id: ownBookOne.ownBook.id,
        author: 'third author',
        search: 'second name third author'
    })

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