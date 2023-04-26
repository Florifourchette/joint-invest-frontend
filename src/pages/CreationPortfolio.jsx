import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'

const CreationPortfolio = () => {
const [newPortfolioName, setNewPortfolioName]=useState('')
const [newPortfolioInitialAmount, setNewPortfolioInitialAmount]=useState(0)
const [newPortfolioUsername, setNewPortfolioUsername]=useState('')
const [uppercaseDetected, setUppercaseDetected]=useState(false)
const [checkUsername, setCheckUsername]=useState('')

const {userId} = useParams()

useEffect(()=>{
  axios.get('http://localhost:3000/api/overview').then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error)})
},[])

const containsUppercase = (str) => {
  return Boolean(str.match(/[A-Z]/))
}

const handleSubmit = () => {
  console.log({userId})
  axios.post(`http://localhost:3000/api/creation_portfolio/${userId}`, {
    initial_amount: newPortfolioInitialAmount,
    name_of_portfolio: newPortfolioName,
    friend_username: newPortfolioUsername
  })
  .then(function (response) {
    setCheckUsername(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });}

  useEffect(()=>{
    setCheckUsername('')
    setUppercaseDetected(false)
  },[newPortfolioUsername])

  return (
    <>
      <Form onSubmit={handleSubmit} >
    <Form.Field>
      <label>Portfolio name</label>
      <input placeholder='Portfolio name' onChange={(e)=>setNewPortfolioName(e.target.value)} requires/>
    </Form.Field>
    <Form.Field>
      <label>Initial amount</label>
      <input placeholder='Initial amount' onChange={(e)=>setNewPortfolioInitialAmount(e.target.value)} type='number' required/>
    </Form.Field>
    <Form.Field>
      <label>Friend username</label>
      <input placeholder='Friend username' onChange={(e)=>containsUppercase(e.target.value)?setUppercaseDetected(true):setNewPortfolioUsername(e.target.value)} required/>
      {checkUsername==='user not found'?<p>User has not been found</p>:<p></p>}
      {checkUsername==='identical ids'?<p>You cannot create a portfolio with yourself</p>:<p></p>}
      {uppercaseDetected?<p>the username should be in lowercase</p>:<p></p>}
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </>
  )
}

export default CreationPortfolio
