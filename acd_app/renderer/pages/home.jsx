import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/global.module.css';
import InputForm from './home_components/inputform.jsx';
import DataParser from './home_components/dataparser.jsx';
import SubmitData from './home_components/submitdata.jsx';
import { dbInit } from './home_components/db.js';
import { parse } from 'dotenv';

function Home() {
  const [uploadedData, setUploadedData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [currentDBVersion, setCurrentDBVersion] = useState(null);

  useEffect(async () => {
    await setCurrentDBVersion(await dbInit());
  },[]);

  return (
    <React.Fragment>
      <Head>
        <title>Armored Core Data App</title>
      </Head>
      <div className={styles.body}>
        <div>
          <h1>Current Database Version: {currentDBVersion ? currentDBVersion : "Loading..."}</h1>
        </div>

        <div>
          <InputForm uploadedData={uploadedData} setUploadedData={setUploadedData} />
        </div>

        <div>
          {uploadedData ? (<DataParser uploadedData={uploadedData} parsedData={parsedData} setParsedData={setParsedData}/>) : (<p>No Data Uploaded</p>)}
        </div>

        <div>
          {parsedData ? (<SubmitData parsedData={parsedData} />) : null}
        </div>
    
      </div>
    </React.Fragment>
  );
};

export default Home;
