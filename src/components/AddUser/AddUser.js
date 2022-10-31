import React, { useState } from 'react'

const AddUser = () => {
  const [user, setUser] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
      fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
              'content-type':'application/json'
          },
          body:JSON.stringify(user)
    }).then((res) =>
      res.json().then((data) => {
          console.log(data)
          if (data.acknowledged)
          {
              alert('user added sucessfully')
              e.target.reset()
              }
      })
    )
  }
  const handleInput = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newUser = { ...user }
    newUser[field] = value
    setUser(newUser)
  }
  return (
    <div>
      <h1>Please Add New User..</h1>
      <form onSubmit={handleSubmit}>
        <input
          onBlur={handleInput}
          type='text'
          name='name'
          placeholder='name'
          required
        />
        <br />
        <input
          onBlur={handleInput}
          type='text'
          name='address'
          placeholder='address'
          required
        />
        <br />
        <input
          onBlur={handleInput}
          type='email'
          name='email'
          id=''
          placeholder='email'
          required
        />
        <br />
        <button type='submit'>Add User</button>
      </form>
    </div>
  )
}

export default AddUser
