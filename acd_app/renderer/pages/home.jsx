import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';
import styles from '../styles/global.module.css';
import InputForm from './home_components/inputform.jsx';

function Home() {
  const [uploadedData, setUploadedData] = useState(null);

  return (
    <React.Fragment>
      <Head>
        <title>Armored Core Data App</title>
      </Head>
      <div className={styles.body}>
        <InputForm uploadedData={uploadedData} setUploadedData={setUploadedData} />
      </div>
    </React.Fragment>
  );
};

export default Home;
