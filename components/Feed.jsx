'use client'
import {useEffect, useState} from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      { data.map((post) => {
        return (<PromptCard
          key={ post._id }
          post={ post }
          handleTagClick={ handleTagClick }
        />)
      }) }
    </div>
  )
}
const Feed = () => {
  const [ searchText, setSearchText ] = useState('')
  const [ promptData, setPromptData ] = useState([])
  const handleSearchText = () => {

  }

  useEffect( () => {
    const fetchPrompts = async() =>{
      const res = await fetch('api/prompt')
      const data = await res.json()
      setPromptData(data);
    }
    fetchPrompts()
  }, [])

  return (
    <div>
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search a tag or a username"
          value={ searchText }
          onChange={ handleSearchText }
          required
          className="search-input peer"
        />
        <PromptCardList
          data={ promptData }
          handleTagClick={() => {}}
        />
      </form>
    </div>
  );
};

export default Feed;