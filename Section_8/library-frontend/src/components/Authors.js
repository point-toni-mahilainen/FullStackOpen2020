import React from 'react'
import EditAuthorForm from './EditAuthorForm'

const Authors = ({ show, authors }) => {
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            Born
                        </th>
                        <th>
                            Books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <EditAuthorForm authors={authors}/>
        </div>
    )
}

export default Authors