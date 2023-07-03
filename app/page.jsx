import React from 'react';
import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden'/>
        <span className=''>AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptbook is an open-source AI prompt searching tool for modern world to
        discover, create and share most useful prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;