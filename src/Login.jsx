import { useState } from "react"
import { z } from "zod"

let userschema = z.string().min(6, "username must need min 6 characters").max(16, "max limit 16 character")
let passwordschema = z.string().min(8, "password must need min 8 characters").max(16, "max limit 16 character")

function validate(schema, value) {
  if (!value) return ""
  let result = schema.safeParse(value)
  if (result.success) return ""
  return result.error.issues[0].message
}

function Login() {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let senddetails = async (event) => {
    event.preventDefault()
    let jwttoken = localStorage.getItem('token')
    let response = await fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwttoken}`
      },
      body: JSON.stringify({ username, password })
    })
    let data = await response.json()
    alert(data.msg)
  }

  return (
    <>
      <section style={{ textAlign: "center" }}>
        <h1 class='text-red-400'>Login to your account</h1><br />
        <form onSubmit={senddetails}>
          <input class='animate-pulse' onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="username" /><br />
          <p>{validate(userschema, username)}</p>
          <input class='animate-pulse' onChange={(e) => { setPassword(e.target.value) }} type="text" placeholder="password" /><br />
          <p>{validate(passwordschema, password)}</p>
          <button class='animate-pulse bg-sky-400 rounded-b-md'>Login</button>
        </form>
      </section>
    </>
  )
}

export default Login