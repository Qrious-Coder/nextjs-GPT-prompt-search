import React from 'react';
import Feed from '@components/Feed';

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <div className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </div>
    <p className='desc text-center'>
      PrompBox is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>

    <Feed />
  </section>
);

export default Home;