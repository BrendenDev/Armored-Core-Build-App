import { useEffect, useState } from 'react';
import styles from '../../styles/global.module.css';

export default function SubmitData({ parsedData }) {

    const [finalData, setFinalData] = useState(null);

    //1 = Unit | 2 = Frame | 3 = Inner | 4 = Expansion
    useEffect(() => {
        const data = [];
        //getting rid of example part
        for(let i = 0; i < parsedData.length; i++) {
            const partsList = parsedData[i];
            partsList.shift();
            data.push(partsList);
        }

        //data = 
    },[parsedData]);

    return(
        <span className={styles['data-submit']}>Submit Data</span>
    );
}