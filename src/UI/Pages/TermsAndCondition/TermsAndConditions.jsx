import React, { useEffect, useState } from 'react'
import './TermsAndConditions.css';
import { url } from '../../../utils/api';

const TermsAndConditions = () => {

    const [termsConditions, setTermsConditions] = useState()
    const handleTermsAndConditions = async () => {
        const api = `/api/v1/pages/terms-conditions/get`
        try {
            const response = await fetch(`${url}${api}`, {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setTermsConditions(result.termsConditions.content);
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }

    useEffect(() => {
        handleTermsAndConditions();
    })
  return (
    <div className='terms-and-conditions-main-container'>
        <div className='term-and-condition-detail-container'>
            {/* {termsConditionData.map((item, index) => (
                <div className='term-condition-title-and-list'>
                    <h3 className='term-and-condition-title'>{item.title}</h3>
                    <ul className='term-condition-list'>
                        {item.details.map((detail, detailIndex) => (
                            <p className='term-condition-list-item' key={detailIndex}>{detail}</p>
                        ))}
                    </ul>
                </div>
            ))} */}
            <div dangerouslySetInnerHTML={{ __html: termsConditions }} ></div>
        </div>
    </div>
  )
}

export default TermsAndConditions
