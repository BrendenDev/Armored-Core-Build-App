import { useState, useRef } from 'react';
import styles from '../../styles/global.module.css';


export default function DataParser({ uploadedData, parsedData, setParsedData }) {
    const xlsx = require('xlsx');

    const [renderedData, setRenderedData] = useState(null);

    useState(async () => {
        const buffer = await uploadedData.arrayBuffer(); 

        const workbook = xlsx.read(buffer, {type:'array'});

        //sheet 1 = Unit | 2 = Frame | 3 = Inner | 4 = Expansion
        const sheet1 = workbook.Sheets[workbook.SheetNames[0]];
        const sheet2 = workbook.Sheets[workbook.SheetNames[1]];
        const sheet3 = workbook.Sheets[workbook.SheetNames[2]];
        const sheet4 = workbook.Sheets[workbook.SheetNames[3]];

        const dataList = [];
        dataList.push(xlsx.utils.sheet_to_json(sheet1));
        dataList.push(xlsx.utils.sheet_to_json(sheet2));
        dataList.push(xlsx.utils.sheet_to_json(sheet3));
        dataList.push(xlsx.utils.sheet_to_json(sheet4));

        setParsedData(dataList);

        const tables = [];

        let i = 0;

        for(const data of dataList) {
            if(data[1]) {
                const rows = data.map(row => (
                    <tr>
                        {
                            Object.keys(row).map(key => {
                                return <td className={styles['data-table-data']}>{row[key]}</td>
                            })
                        }
                    </tr>
                ));

                rows.shift();
        
        
                const headers = 
                <tr>
                    {
                    Object.keys(data[0]).map(key => {
                        return <th className={styles['data-table-header']}>{key}</th> 
                    })
                    }
                </tr>
                
                tables.push(
                    <>
                        <h2 className={styles['data-table-title']}>{workbook.SheetNames[i]}</h2>
                        <table className={styles['data-table']}>{headers}{rows}</table>
                    </>
                );
            }
            i++;
            

        }


        

        setRenderedData(tables);
    
    },[]);

    return(
        <>
            {renderedData ? renderedData : null}
        </>
    );
}