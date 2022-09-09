import React from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

function TopNav() {
    return (
        <>
           <div> <nav className={styles.mainnav}>
                <ul className={styles.nav}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav></div>

        </>
    )
}

export default TopNav