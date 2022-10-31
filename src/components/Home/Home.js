import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Home = () => {
    const users = useLoaderData()
    const [displayUsers,setDisplayUsers]=useState(users)
  const handleButton = (user) => {
    const agree = window.confirm(
      `Are you sure you want to delete the user ${user.name}`
    )
    if (agree) {
      console.log(user._id)
        fetch(`http://localhost:5000/users/${user._id}`, {
          method:'DELETE'
      })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              if (data.deletedCount > 0)
              {
                  const remaingUser = displayUsers.filter(usr => usr._id !== user._id)
                  alert('user deleted sucessfully')
                  setDisplayUsers(remaingUser)
                  }
      })
      }
  }
  return (
    <div>
      <h1>User:{displayUsers.length}</h1>
      <div>
        {displayUsers.map((user) => (
          <p key={user._id}>
            {user.name} {user.email}
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleButton(user)}>X</button>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Home
