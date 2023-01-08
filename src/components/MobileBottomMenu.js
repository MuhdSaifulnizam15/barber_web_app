import Link from 'next/link';
import React from 'react'
import styles from '../styles/MobileBottomMenu.module.css';

const MobileBottomMenu = () => {

  return (
    <>
      <div className={styles.bottomMenu} >
        <div className={`${styles.list}`}>
          <Link href="/sales" className={styles.link}>
              {/* <div className={styles.icon}>
                <h4>ICONS</h4>
              </div> */}
              <span className={styles.title}>Sales</span>
          </Link>
        </div>
        <div className={`${styles.list}`}>
          <Link href="/transactions" className={styles.link}>
              {/* <div className={styles.icon}>
              <h4>ICONS</h4>
              </div> */}
              <span className={styles.title}>Transactions</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileBottomMenu;