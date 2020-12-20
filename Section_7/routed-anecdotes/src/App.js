import React, { useState } from 'react'
import {
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useHistory,
    useRouteMatch
} from 'react-router-dom'
import About from './Components/About'
import Anecdote from './Components/Anecdote'
import AnecdoteList from './Components/AnecdoteList'
import CreateNew from './Components/CreateNew'
import Footer from './Components/Footer'
import Menu from './Components/Menu'
import Notification from './Components/Notification'

const App = () => {
    const history = useHistory()
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])
    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
        history.push('/')
        setNotification(`a new anecdote "${anecdote.content}" created!`)
        setTimeout(() => {
            setNotification('')
        }, 10000)
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            {
                notification !== '' ? <Notification message={notification} /> : null
            }
            <Switch>
                <Route path='/anecdote/:id'>
                    <Anecdote anecdotes={anecdotes} />
                </Route>
                <Route exact path='/'>
                    <AnecdoteList anecdotes={anecdotes} />
                </Route>
                <Route path='/create'>
                    <CreateNew addNew={addNew} />
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App;