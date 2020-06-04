import 'cross-fetch/polyfill'
import '@babel/polyfill/noConflict'
import seedDatabase, { userOne, userTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
    searchBookByNameOrAuthor,
} from './utils/operations'

beforeEach(seedDatabase)

test('Should search by book author', async () => {
    const client = getClient(userTwo.jwt)

    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables:  { query: 'Тургенев' },
    })

    responce.data.searchBookByNameOrAuthor.map(book => {
        expect(book.author).toEqual(expect.stringContaining('Тургенев'));
    })
})

test('Should search by book name', async () => {
    const client = getClient(userTwo.jwt)

    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: 'Война и мир' },
    })

    responce.data.searchBookByNameOrAuthor.map(book => {
        expect(book.name).toEqual(expect.stringContaining('Война и мир'));
    })
})

test('Should not search when query less than 4 characters', async () => {
    const client = getClient(userTwo.jwt)

    let responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: '' }
    })

    expect(responce.data.searchBookByNameOrAuthor.length).toBe(0)

    responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: 'Вой' }
    })
    
    expect(responce.data.searchBookByNameOrAuthor.length).toBe(0)
})

test('Should search when query more than 3 characters', async () => {
    const client = getClient(userTwo.jwt)

    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables:  { query: 'Войн' }
    })

    expect(responce.data.searchBookByNameOrAuthor.length > 0).toBe(true)
})

test('Should not to be dependent on camel cases', async () => {
    const client = getClient(userTwo.jwt)

    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: 'ВойНа и Мир' },
    })

    expect(responce.data.searchBookByNameOrAuthor.length > 0).toBe(true)
})

test('Should not search own books', async () => {
    const client = getClient(userOne.jwt)

    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: 'ВойНа и Мир' },
    })

    expect(responce.data.searchBookByNameOrAuthor.length === 0).toBe(true)
})

test('Should search by name and author', async () => {
    const client = getClient(userTwo.jwt)

    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: 'Первая любовь Тургенев' },
    })

    expect(responce.data.searchBookByNameOrAuthor[0].name).toBe('Первая любовь Повести')
    expect(responce.data.searchBookByNameOrAuthor[0].author).toBe('Тургенев')
})