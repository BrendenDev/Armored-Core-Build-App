import styles from '../../styles/global.module.css';

export default function InputForm({ uploadedData, setUploadedData }) { 

    const handleFileChange = (e) => {
      const fileInput = e.target;
  
      if (fileInput.files.length > 0) {
        setUploadedData(fileInput.files[0]);
        console.log(fileInput.files[0]);
        
      } else {
        console.log("Already uploaded files");
      }
    };
  
    /** */
    // need to add multiple file upload and remove file

    return(
      <form className={styles['data-form']}>
        <input type="file" id="data" name="hi" onChange={handleFileChange} className={styles['data-input']}/>
        <label for="data" accept=".xlsx" className={uploadedData ? `${styles['data-label']} ${styles['data-label-uploaded']}` : styles['data-label']}>
          {uploadedData ? `Data Uploaded:` : 'Upload Part Data (only .xlsx)'}
        </label>
        <div>
          {uploadedData ? (<p>{uploadedData['name']}</p>) : null}
        </div>
        

        <input type="submit" value="Submit Data" className={styles['data-submit']} />
      </form>
    )
    
  }