import { useState, useRef } from 'react';
import styles from '../../styles/global.module.css';


export default function DataParser({ uploadedData, parsedData, setParsedData }) {
    const xlsx = require('xlsx');

    const [renderedData, setRenderedData] = useState(null);

    useState(async () => {
        const buffer = await uploadedData.arrayBuffer(); 

        const workbook = xlsx.read(buffer, {type:'array'});

        //sheet 1 = Unit | 2 = Frame | 3 = Inner | 4 = Expansion
        const sheet = workbook.Sheets["Unit"];

        const data = xlsx.utils.sheet_to_json(sheet);

        setParsedData(data);


        const rows = data.map(row => (
            <tr>
                {
                    Object.keys(row).map(key => {
                        return <td className={styles['data-table-data']}>{row[key]}</td>
                    })
                }
            </tr>
        ));


        const headers = 
        <tr>
            {
            Object.keys(data[1]).map(key => {
                return <th className={styles['data-table-header']}>{key}</th> 
            })
            }
        </tr>
        
        const table = (<table className={styles['data-table']}>{headers}{rows}</table>);

        setRenderedData(table);
    
    },[]);

    return(
        <>
            {renderedData ? renderedData : null}
        </>
    );
}