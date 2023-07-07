'use client'
import React, {useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  //暂时写死
  const { data: session } = useSession()
  const [ providers, setProviders ] = useState(null)
  const [ toggleDropdown, setToggleDropdown ] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })()
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <span className='logo_text'>PromptBox</span>
      </Link>
        {/*PC navigation*/}
        <div className='sm:flex hidden'>
          { session?.user ?
            (<div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>
                Create Prompt
              </Link>
              <button type="button" onClick={ signOut }
                      className='outline_btn'>
                Sign Out
              </button>
              <Link href='/profile'>
                <Image
                  src={ session?.user.image }
                  width={37}
                  height={37}
                  className='rounded-full border border-amber-300'
                  alt='profile'
                />
              </Link>
            </div>) :
            (
              <>
                { providers && Object.keys(providers).map((provider) =>
                  (<button
                    type="button"
                    key={ provider.name }
                    onClick={ () => signIn(provider.id) }
                    className='black_btn'
                  >
                    Sign In
                  </button>)
                )}
              </>
            )
          }
        </div>
      {/*mobile navigation*/}
      <div className='sm:hidden flex relative'>
        { session?.user ?
          (<div className='flex'>
            <Image
              src={ session?.user.image }
              width={37}
              height={37}
              className='rounded-full'
              alt={'profile'}
              onClick={ () => setToggleDropdown( prev => !prev ) }
            />
            { toggleDropdown && (
             <div className='dropdown'>
               <Link href='/profile'
                     className='dropdown_link'
                     onClick={() => setToggleDropdown(false) }
               >
                  My Profile
               </Link>
               <Link href='/create-prompt'
                     className='dropdown_link'
                     onClick={() => setToggleDropdown(false) }
               >
                 Create Prompt
               </Link>
               <button
                 type='button'
                 onClick={() => {
                   setToggleDropdown(false)
                   signOut()
                 }}
                 className='mt-5 w-full black_btn'
               >
                 Sign Out
               </button>
             </div>
            )}
          </div>)
          :
          <>
            { providers && Object.keys(providers).map((provider) =>
              (<button
                type="button"
                key={ provider.name }
                onClick={ () => signIn(provider.id) }
                className='black_btn'
              >
                Sign In
              </button>)
            )}
          </>}
      </div>
    </nav>
  );
};

export default Nav;