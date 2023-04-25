import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'

const CreationPortfolio = () => {
const [newPortfolioName, setNewPortfolioName]=useState('')
const [newPortfolioInitialAmount, setNewPortfolioInitialAmount]=useState('')
const [newPortfolioUsername, setNewPortfolioUsername]=useState('')

const {userID} = useParams()

const handleSubmit = () => {axios.post(`http://localhost:3000/api/portfolio_creation/${userID}`, {
    initial_amount: newPortfolioInitialAmount,
    name_of_portfolio: newPortfolioName,
    friend_username: newPortfolioUsername
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });}


  return (
    <>
      <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Portfolio name</label>
      <input placeholder='Portfolio name' onChange={(e)=>setNewPortfolioName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Initial amount</label>
      <input placeholder='Initial amount' onChange={(e)=>setNewPortfolioInitialAmount(e.target.value)}/>
    </Form.Field>
    <Form.Field>
      <label>Friend username</label>
      <input placeholder='Friend username' onChange={(e)=>setNewPortfolioUsername(e.target.value)}/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </>
  )
}

export default CreationPortfolio
