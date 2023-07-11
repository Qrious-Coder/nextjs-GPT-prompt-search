'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'
const EditPrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [ submitting, setSubmitting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async(e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert('Prompt ID not found!')
    try{
      const res = await fetch(`/api/prompt/${promptId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
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
        type = 'Edit'
        post = { post }
        setPost = { setPost }
        submitting = { submitting }
        handleSubmit = { updatePrompt }
      />
    </div>
  );
};

export default EditPrompt;