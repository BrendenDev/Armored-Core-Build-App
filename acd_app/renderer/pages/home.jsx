import React from 'react';
import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/global.module.css';

function InputForm() { 

  const [dataUploaded, setDataUploaded] = useState(0);
  const [currentUploaded, setCurrentUploaded] = useState(null);

  const handleFileChange = () => {
    setDataUploaded(dataUploaded+1);
    const fileInput = document.getElementById('data');

    if (fileInput.files.length > 0) {
      setCurrentUploaded(fileInput.files['0']['name']);
    } else {
      
    }
  };


  // need to add multiple file upload and remove file
  if(dataUploaded > 0) {
    return(
      <form className={styles['data-form']}>
        <input type="file" id="data" name="hi" onChange={handleFileChange} className={`${styles['data-input']} ${styles['data-label-uploaded']}`}></input>
        <label for="data" accept=".md" className={`${styles['data-label']} ${styles['data-label-uploaded']}`}>
          Uploaded {currentUploaded}
        </label>

        <input type="submit" value="Submit Data" className={styles['data-submit']}></input>
      </form>
    );
  }
  else {
    return(
      <form className={styles['data-form']}>
        <label for="data" id='data-label' className={styles['data-label']}>
          Upload Part Data (only .xlsx)
        </label>
        {/* CHANGE ACCEPT TO .xlsx */}
        <input type="file" accept=".md" id="data" name="hi" onChange={handleFileChange} className={styles['data-input']}></input>

        <button className={styles['data-submit']}>Submit Data</button>
      </form>
    );
  }
}

function Home() {

  return (
    <React.Fragment>
      <Head>
        <title>Armored Core Data App</title>
      </Head>
      <div className={styles.body}>
        <InputForm />
      </div>
    </React.Fragment>
  );
};

export default Home;
