import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';
import styles from '../styles/global.module.css';
import InputForm from './home_components/inputform.jsx';
import DataParser from './home_components/dataparser.jsx';

function Home() {
  const [uploadedData, setUploadedData] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  return (
    <React.Fragment>
      <Head>
        <title>Armored Core Data App</title>
      </Head>
      <div className={styles.body}>

        <div>
          <InputForm uploadedData={uploadedData} setUploadedData={setUploadedData} />
        </div>

        <div>
          {uploadedData ? (<DataParser uploadedData={uploadedData} parsedData={parsedData} setParsedData={setParsedData}/>) : (<p>No Data Uploaded</p>)}
        </div>
    
      </div>
    </React.Fragment>
  );
};

export default Home;
