import { useState } from "react"
import {z} from "zod"

let userschema=z.string().min(6,"username must need min 6characters").max(16,'max limit 16 characters')
let passwordchema=z.string().min(8,"username must need min 8characters").max(16,'max limit 16 characters')
let emailschema=z.email().min(3,"min charcters 3")
let roleschema=z.string().min(1,"username must need min 1characters")

//helper function(
function validate(schema,value){
  if(!value) return ""
 let result= schema.safeParse(value)
 if(result.success) return ""
 return result.error.issues[0].message
}
function Register() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [role, setrole] = useState('')

   let senddetails=async (event)=>{
    event.preventDefault()
    let response=  await fetch('https://react-ecommerce-backend-vlnk.onrender.com/register',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({username,password,email,role})
      })

    let data=await  response.json()
    let token=data.token
    localStorage.setItem("token",token)
    alert(data.msg)
   }

  return (
    <>
    <form onSubmit={senddetails}>
   <input  onChange={(e)=>{setusername(e.target.value)}}            type="text" placeholder="username" /><br />
   <p>{validate(userschema,username)}</p>
   <input   onChange={(e)=>{setpassword(e.target.value)}}                                              type="password" placeholder="password" /><br />
      <p>{validate(passwordchema,password)}</p>
   <input   onChange={(e)=>{setemail(e.target.value)}}                                type="text" placeholder="email" /><br />
      <p>{validate(emailschema,email)}</p>
   <input    onChange={(e)=>{setrole(e.target.value)}}                                             type="text" placeholder="role" /><br />
        <p>{validate(roleschema,role)}</p>
     <button type='submit'  >register</button>
    </form>
    </>
  )
}

export default Register
