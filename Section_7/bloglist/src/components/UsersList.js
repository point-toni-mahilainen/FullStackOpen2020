import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({users}) => {
    const tbody = users ? users
        .map(user =>
            <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
            </tr>
        ) : 'Loading...'

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList