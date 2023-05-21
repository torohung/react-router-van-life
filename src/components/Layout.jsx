import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

export const Layout = () => {
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
