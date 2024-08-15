import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
        Home
        <section>
            <Outlet/>
        </section>
      
    </div>
  )
}

export default Home
