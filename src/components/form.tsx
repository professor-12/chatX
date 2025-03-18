"use client"
import useForm from '@/hooks/useForm'
import React from 'react'

const Form = () => {
      const { errors, isPending, register, reset, submitForm } = useForm({ name: "", email: "", password: "" })
      return (
            <form onSubmit={submitForm(async (value) => { })} className='bg-neutral-200  min-h-36 mt-12 w-full mx-auto max-w-[700px]'>
                  <div>
                        <input type="text" {...register("name", { required: { message: "Please fill out this field" } })} />
                        {errors.name}
                  </div>
                  <div>
                        <input type="text" {...register("email", { validate: (value) => { return { isValid: /@/.test(value), message: "This si blb blb a" } } })} />
                        {errors.email}
                  </div>
                  <div>
                        <input type="text" {...register("password", { required: { message: "Please fill out this field" } })} />
                        {errors.password}
                  </div>
                  <button>Submit</button>
            </form>
      )
}

export default Form