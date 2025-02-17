import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../Sidebar/Sidebar.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


function Sidebar() {
    const router = useRouter();

  const pathname = usePathname();
// utils/auth.js
  // Remove token from session/local storage

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Image 
        src={"https://i.ibb.co/g918t1D/Mask-group.png"}
        alt='Logo'
        width={160}
        height={70}
        className={styles.logo}
        />
        <ul className={styles.list}>
        <li className={pathname === 'admin/dashboard/product-list' ? styles.active : ''}>
            <Link href='./product-list'>All Products</Link>
          </li>
        <li className={pathname === 'admin/dashboard/featured-product-list' ? styles.active : ''}>
            <Link href='./featured-product-list'>Featured Products </Link>
          </li>
          <li className={pathname === 'admin/dashboard/article-list' ? styles.active : ''}>
            <Link href='./article-list'>Articles</Link>
          </li>
          <li>
            <button className={styles.logoutbtn} onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
