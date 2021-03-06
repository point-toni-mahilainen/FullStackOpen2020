import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, USER, BOOK_ADDED } from './queries'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
    const [token, setToken] = useState(null);
    const [page, setPage] = useState('authors')
    const resultUser = useQuery(USER)
    const resultAuthors = useQuery(ALL_AUTHORS)
    const resultBooks = useQuery(ALL_BOOKS)
    const client = useApolloClient()

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map(b => b.id).includes(object.id)

        const dataBooks = client.readQuery({ query: ALL_BOOKS })
        const dataAuthors = client.readQuery({ query: ALL_AUTHORS })
        const authorToUpdate = dataAuthors.allAuthors.find(a => a.name === addedBook.author.name)
        const updatedAuthorObj = {
            ...authorToUpdate,
            books: [
                ...authorToUpdate.books,
                { __typename: 'Book', title: addedBook.title }
            ]
        }
        const updatedAuthors = dataAuthors.allAuthors.map(obj => obj === authorToUpdate ? updatedAuthorObj : obj)

        if (!includedIn(dataBooks.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataBooks.allBooks.concat(addedBook) }
            })

            client.writeQuery({
                query: ALL_AUTHORS,
                data: { allAuthors: updatedAuthors }
            })

            addedBook.genres.forEach(genre => {
                const dataBooksFiltered = dataBooks.allBooks.filter(book => book.genres.includes(genre))
                client.writeQuery({
                    query: ALL_BOOKS,
                    variables: { genre },
                    data: {
                        ...dataBooksFiltered,
                        allBooks: [...dataBooksFiltered, addedBook]
                    }
                })
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            alert(`New book added. Title: ${addedBook.title}`)
            updateCacheWith(addedBook)
        }
    })

    useEffect(() => {
        setToken(localStorage.getItem('library-user-token'))
    }, [])

    const logout = () => {
        setToken(null)
        setPage('authors')
        localStorage.clear()
        client.resetStore()
    }

    if (resultAuthors.loading) {
        return <div>loading...</div>
    }

    if (resultBooks.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            {
                token ?
                    <div>
                        <button onClick={() => setPage('authors')}>authors</button>
                        <button onClick={() => setPage('books')}>books</button>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommendations')}>recommendations</button>
                        <button onClick={logout}>log out</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => setPage('authors')}>authors</button>
                        <button onClick={() => setPage('books')}>books</button>
                        <button onClick={() => setPage('login')}>login</button>
                    </div>
            }

            <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} loggedIn={token} />
            <Books show={page === 'books'} allBooks={resultBooks.data.allBooks} />
            <LoginForm setToken={setToken} setPage={setPage} show={page === 'login'} />
            <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />
            <Recommendations show={page === 'recommendations'} allBooks={resultBooks.data.allBooks} user={resultUser.data.me} />
        </div>
    )
}

export default App