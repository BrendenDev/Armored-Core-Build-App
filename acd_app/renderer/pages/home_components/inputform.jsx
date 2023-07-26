import styles from '../../styles/global.module.css';

export default function InputForm({ uploadedData, setUploadedData }) { 

    const handleFileChange = () => {
      const fileInput = document.getElementById('data');
  
      if (fileInput.files.length > 0) {
        const parsedData = []; 
        for(let i = 0; i < fileInput.files.length; i++) {
          parsedData.push(fileInput.files[i]);
        }
        setUploadedData(parsedData);
        
      } else {
        console.log("Already uploaded files");
      }
    };
  
    /** */
    // need to add multiple file upload and remove file

    return(
      <form className={styles['data-form']}>
        <input multiple='multiple' type="file" id="data" name="hi" onChange={handleFileChange} className={styles['data-input']}/>
        <label for="data" accept=".md" className={uploadedData ? `${styles['data-label']} ${styles['data-label-uploaded']}` : styles['data-label']}>
          {uploadedData ? `Data Uploaded:` : 'Upload Part Data (only .xlsx)'}
        </label>
        <div>
          {uploadedData ? uploadedData.map((file) => (
          <p>{file['name']}</p>
          )) : null}
        </div>
        

        <input type="submit" value="Submit Data" className={styles['data-submit']} />
      </form>
    )
    
  }