import React, { useState } from 'react'
import {
  Button,
  Form,
  Message,
  Modal,
  TransitionablePortal,
} from 'semantic-ui-react'
import { login } from '../services/user'
import qs from 'qs'
import { useAuth } from '../contexts/AuthPorvider'

const defaultValue = {
  formData: {
    username: '',
    password: '',
  },
  isSubmit: false,
  isError: false,
}

const LoginModal = ({ isOpen, handleClose }) => {
  const { setUserInfo } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(defaultValue.formData)
  const [isSubmit, setIsSubmit] = useState(defaultValue.isSubmit)
  const [isError, setIsError] = useState(defaultValue.isError)

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value })
  }

  const setDefaultOnClose = () => {
    setIsSubmit(defaultValue.isSubmit)
    setIsError(defaultValue.isError)
    setFormData(defaultValue.formData)
    handleClose()
  }

  const handleSubmit = () => {
    setIsSubmit(true)
    if (formData.username && formData.username) {
      setIsLoading(true)
      login(qs.stringify(formData))
        .then(({ data }) => {
          setUserInfo(data)
          setDefaultOnClose()
        })
        .catch(() => {
          setIsError(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <TransitionablePortal
      open={isOpen}
      transition={{
        animation: 'scale',
        duration: 300,
      }}
    >
      <Modal open onClose={setDefaultOnClose} size='mini' closeIcon>
        <Modal.Header>Login as Admin</Modal.Header>
        <Modal.Content>
          {isError && (
            <Message
              error
              header='Fail to Login.'
              content='Your username or password is invalid.'
            />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label='Username'
              name='username'
              placeholder='Enter your username'
              error={isSubmit && !formData.username}
              onChange={handleChange}
            />
            <Form.Input
              label='Password'
              name='password'
              placeholder='Enter your Password'
              error={isSubmit && !formData.password}
              onChange={handleChange}
            />

            <Button loading={isLoading}>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  )
}

export default LoginModal
