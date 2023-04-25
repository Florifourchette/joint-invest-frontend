import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const CreationPortfolio = () => {



  return (
    <>
      <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Portfolio name</label>
      <input placeholder='Portfolio name'/>
    </Form.Field>
    <Form.Field>
      <label>Initial amount</label>
      <input placeholder='Initial amount'/>
    </Form.Field>
    <Form.Field>
      <label>Friend username</label>
      <input placeholder='Friend username'/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </>
  )
}

export default CreationPortfolio
