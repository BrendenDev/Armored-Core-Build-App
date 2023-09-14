import { useEffect, useState, useRef } from 'react';
import { loadExistingDBData, uploadUnitData, uploadFrameData, uploadInnerData, uploadExpansionData, uploadVersionData } from './db.js';
import styles from '../../styles/global.module.css';

export default function SubmitData({ parsedData }) {

    const [finalData, setFinalData] = useState(null);
    const comment = useRef(null);
    const version = useRef(null);
    const [dupeFound, setDupeFound] = useState(null);
    const [finished, setFinished] = useState(null)

    function convertKeysToSnakeCase(obj) {
        const newObj = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = key.split(' ').map(word => word.toLowerCase()).join('_');
            newObj[newKey] = obj[key];
          }
        }
        return newObj;
    }

    useEffect(() => {
   
    },[parsedData]);

    const handleVerify = async () => {
        //0 = Unit | 1 = Frame | 2 = Inner | 3 = Expansion
        const existingData = await loadExistingDBData();

        //getting rid of example part
        const tempData = [];

        for(let i = 0; i < parsedData.length; i++) {
            const partsList = parsedData[i];
            partsList.shift();
            tempData.push(partsList);
        }

        //formatting key names to be lowercase and db friendly

        const dataList = [];

        for(let i = 0; i < tempData.length; i++) {
            const tempList = tempData[i];
            const parsedPartsList = tempList.map(convertKeysToSnakeCase);
            dataList.push(parsedPartsList);
        }

        //finding dupe parts

        const dupeParts = []; 
        
        for(let i = 0; i < 4; i++) {
            if(dataList[i]) {
                for(const data of existingData[i]) {
                    const dupePart = dataList[i].find(obj => obj.name === data.name && obj.type === data.type);
                    if(dupePart) {
                        dupeParts.push(dupePart);
                    }
                }
            }
        }

        //filtering datalist for dupe parts
        if(dupeParts) {
            setDupeFound(dupeParts);
            const filteredData = [];
            for(let i = 0; i < 4; i++) {
                const data = dataList[i].filter(obj => {
                    const isMatch = dupeParts.some(filterObj => filterObj.name === obj.name && filterObj.type === obj.type)
                    return !isMatch;
                });
                filteredData.push(data);
            }
            
            setFinalData(filteredData);
        }
        
    }

    const handleSubmit = async () => {
        setFinished(true);
        //0 = Unit | 1 = Frame | 2 = Inner | 3 = Expansion
        console.log(uploadUnitData(finalData[0]));
        console.log(uploadFrameData(finalData[1]));
        console.log(uploadInnerData(finalData[2]));
        console.log(uploadExpansionData(finalData[3]));
        console.log(uploadVersionData(parseFloat(version.current.value), comment.current.value));

    }

    function SubmitButton() {
        return(
            <>
                {!finished ? (
                    <div className={styles['version-comment']}>
                        <label className={styles['version-comment']}>
                            Update Version:
                            <textarea ref={version} style={{resize:'none'}} rows={1} />
                        </label>
                        <label className={styles['version-comment']}>
                            Update Comment:
                            <textarea ref={comment} style={{resize:'none'}} rows={4} />
                        </label>
                        <span className={styles['data-submit']} onClick={handleSubmit}>Submit Data</span>
                    </div>
                ) : (<span className={styles['data-submitted']}>Submitted Data</span>)}
            </>
            
        );
    }

    return(
        <div className={styles['center-stuff']}>
            {!finalData ? <span className={styles['data-submit']} onClick={handleVerify}>Verify Data</span> : <span className={styles['data-submitted']}>Verified Data</span>}
            {!finalData ? null  : <SubmitButton />}
            {dupeFound ? <ul>Duplicate Parts (not uploaded): {dupeFound.map(obj => (<li>Object Name: {obj.name} <br /> Object Type: {obj.type}</li>))}</ul> : null}
        </div>
        
    );
}