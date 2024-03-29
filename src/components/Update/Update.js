import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Update = () => {
  const storedUser = useLoaderData()
  const [user, setUser] = useState(storedUser)

  const handleSubmit = (e) => {
    e.preventDefault()
      console.log(user)
      fetch(`http://localhost:5000/users/${storedUser._id}`, {
          
          method: 'PUT',
          headers: {
              'content-type':'application/json'
          },
          body:JSON.stringify(user)
      })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              if (data.modifiedCount > 0) {
                  alert('user updated sucessfully')
              }
      })
  }
  const handleChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newUser = { ...user }
    newUser[field] = value
    setUser(newUser)
  }
  return (
    <div>
      <h1>Please Update:{storedUser.name}</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          defaultValue={storedUser.name}
          type='text'
          name='name'
          placeholder='name'
          required
        />
        <br />
        <input
          onChange={handleChange}
          defaultValue={storedUser.address}
          type='text'
          name='address'
          placeholder='address'
          required
        />
        <br />
        <input
          onChange={handleChange}
          defaultValue={storedUser.email}
          type='email'
          name='email'
          id=''
          placeholder='email'
          required
        />
        <br />
        <button type='submit'>Update User</button>
      </form>
    </div>
  )
}

export default Update
