import React from 'react';
import '@styles/globals.css';
import Nav from "@components/Nav";
import Provider from "@components/Provider";

//define metadata
export const metadata = {
  title: 'promptbook',
  description: 'Search & Share AI Prompts'
}
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
    <body>

        <div className="main">
          <div className="gradient"></div>
        </div>
        <Provider>
          <main className='app'>
            <Nav/>
            {children}
          </main>
        </Provider>
    </body>
    </html>
  );
};

export default RootLayout ;