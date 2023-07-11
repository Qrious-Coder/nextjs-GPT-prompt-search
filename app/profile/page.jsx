'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const ProfilePage = () => {
  const [ posts, setPosts ] = useState([])
  const{ data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async() => {
      const res = await fetch(`api/users/${session?.user.id}/posts`)
      const data = await res.json()
      setPosts(data)
    }
    if(session?.user.id){
      fetchPosts()
    }
  },[])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async () => {

  }
  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={ posts }
        handleEdit={ handleEdit }
        handleDelete={ handleDelete }
      />
    </div>
  );
};

export default ProfilePage;