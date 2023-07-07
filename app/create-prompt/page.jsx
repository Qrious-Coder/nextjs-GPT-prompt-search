'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'
const CreatePrompt = () => {
  const [ submitting, setSubmitting ] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async(e) => {
    e.preventDefault()
    setSubmitting(true)
    try{
      const res = await fetch('/api/prompt/new',
        {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id
          })
        })
      if(res.ok){
        router.push('/')
      }
    } catch(error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div>
      <Form
        type = 'create'
        post = { post }
        setPost = { setPost }
        submitting = { submitting }
        handleSubmit = { createPrompt }
      />
    </div>
  );
};

export default CreatePrompt;