import 'cross-fetch/polyfill'
import '@babel/polyfill/noConflict'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
    searchBookByNameOrAuthor,
} from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should search by book author', async () => {
    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables:  { query: 'Тургенев' },
    })

    responce.data.searchBookByNameOrAuthor.map(book => {
        expect(book.author).toEqual(expect.stringContaining('Тургенев'));
    })
})

test('Should search by book name', async () => {
    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables: { query: 'Война и мир' },
    })

    responce.data.searchBookByNameOrAuthor.map(book => {
        expect(book.name).toEqual(expect.stringContaining('Война и мир'));
    })
})

test('Should not search when query less than 4 characters', async () => {
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
    const responce = await client.query({
        query: searchBookByNameOrAuthor,
        variables:  { query: 'Войн' }
    })

    expect(responce.data.searchBookByNameOrAuthor.length > 0).toBe(true)
})