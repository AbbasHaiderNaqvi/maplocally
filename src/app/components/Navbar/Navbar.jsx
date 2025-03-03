"use client";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Updated import for Next.js 14
import { Dropdown, Space, Button, Drawer } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Flag from 'react-world-flags';
import styles from './Navbar.module.css'; // Adjust path as needed
import Image from 'next/image';

const Navbar = () => {
  const { t } = useTranslation();
  const pathname = usePathname(); // Using usePathname from next/navigation
  const router = useRouter(); // Correctly call useRouter() inside the component
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isMounted, setIsMounted] = useState(false); // State to track if the component has mounted

  // Language labels for dropdown
  const languageLabels = {
    en: { flag: 'US', name: 'English' },
    es: { flag: 'ES', name: 'Spanish' },
    fr: { flag: 'FR', name: 'French' },
  };

  // Wait until the component is mounted before accessing pathname
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get the language from the URL path after the component mounts
  useEffect(() => {
    if (isMounted && pathname) {
      const languageFromPath = pathname.split('/')[1] || 'en'; // Default to 'en' if no language found
      setSelectedLanguage(languageFromPath);
    }
  }, [isMounted, pathname]); // Run effect when isMounted or pathname changes

  const handleLanguageChange = async (locale) => {
    if (selectedLanguage === locale) return; // Skip if the same language is selected

    // Ensure pathname is available before performing actions
    if (isMounted && pathname) {
      try {
        // Remove the current language from the path and append the new language
        const pathWithoutLocale = pathname.replace(/^\/(en|es|fr)/, ''); // Remove the old language code from the path
        const newPath = `/${locale}${pathWithoutLocale}`; // Add the new language code to the path

        // Use next/navigation to navigate to the new path
        router.push(newPath); // Perform navigation

        // Update selected language after navigation
        setSelectedLanguage(locale);
      } catch (error) {
        console.error('Error changing language:', error);
      }
    } else {
      console.error('pathname is undefined or not available');
    }
  };

  const languageMenu = (
    <ul className={styles.languageMenu}>
      <li onClick={() => handleLanguageChange('en')}>
        <Space>
          <Flag code="US" style={{ width: 20, height: 20, marginRight: 10 }} />
          {t('english')}
        </Space>
      </li>
      <li onClick={() => handleLanguageChange('es')}>
        <Space>
          <Flag code="ES" style={{ width: 20, height: 20, marginRight: 10 }} />
          {t('spanish')}
        </Space>
      </li>
      <li onClick={() => handleLanguageChange('fr')}>
        <Space>
          <Flag code="FR" style={{ width: 20, height: 20, marginRight: 10 }} />
          {t('french')}
        </Space>
      </li>
    </ul>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/">
          <Image 
          src="https://i.ibb.co/HKMR9F8/maplocally.png" 
          alt="Logo" 
          width={140}
          height={60}
          className={styles.logo} 
          />
        </Link>
      </div>
      <div className={styles.center}>
        <ul className={styles.navLinks}>
          {/* <li>
            <Dropdown overlay={languageMenu} trigger={['click']} dropdownStyle={{ backgroundColor: 'white' }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Flag code={languageLabels[selectedLanguage]?.flag} style={{ width: 20, height: 20, marginRight: 10 }} />
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </li> */}
          <li>
            <Link href="/recently-viewed">{t('Recently viewed')}</Link>
          </li>
          <li>
          <Link href="/contact">{t('Contact')}</Link>
          </li>
          {/* <li>
            <Link href="/admin/login">
              <Button className={styles.loginbtn}>{t('Login')}</Button>
            </Link>
          </li> */}
        </ul>
      </div>
      <div className={styles.right}>
        <div className={styles.menuIcon} onClick={() => setDrawerVisible(true)}>
          <MenuOutlined style={{ fontSize: '150%' }} />
        </div>
      </div>
      <Drawer
        title=""
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        className={styles.drawer}
      >
        <div className={styles.drawerHeader}>
          <Link href="/">
            <img src="https://i.ibb.co/HKMR9F8/maplocally.png" alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.drawerMain}>
          <ul className={styles.unorderedList}>
            <li>
              <Dropdown overlay={languageMenu} trigger={['click']} dropdownStyle={{ backgroundColor: 'white' }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Flag code={languageLabels[selectedLanguage]?.flag} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </li>
            <li>
              <Link href="/contact">{t('Contact')}</Link>
            </li>
            <li>
              <Link href="/recently-viewed">{t('Recently viewed')}</Link>
            </li>
            <li>
              <Link href="/signup">{t('Signup')}</Link>
            </li>
            <li>
              <Link href="/login">
                <Button className={styles.loginbtn}>{t('Login')}</Button>
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
