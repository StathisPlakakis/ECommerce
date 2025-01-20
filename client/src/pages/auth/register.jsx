import { registerUser } from '@/store/auth-slice/index.js'
import CommonForm from '../../components/common/form'
import { registerFormControls } from '@/config'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  name: '',
  email: '',
  password: '',
}


const AuthRegister = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message })
        navigate('/auth/login')
      }else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }

    })
  }


  const [formData, setFormData] = useState(initialState)

  return (
    <div className=' mx-auto w-full max-w-md space-y-6'>
      <div className=' text-center'>
        <h1 className='text-3-xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className=' mt-2'>Already have an account <Link to={'/auth/login'} className=' ml-2 font-medium text-primary hover:underline'>Login</Link></p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister