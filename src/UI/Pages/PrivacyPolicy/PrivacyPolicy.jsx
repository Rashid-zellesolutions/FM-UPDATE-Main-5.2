import React, { useEffect, useState } from 'react'
import './PrivacyPolicy.css'
import { url } from '../../../utils/api'

const PrivacyPolicy = () => {
    const [privacyPolicyData, setPrivacyPolicyData] = useState()
    const getPrivacyPolicyContent = async () => {
        const api = `/api/v1/pages/privacy-policy/get`
        try {
            const response = await fetch(`${url}${api}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }// Data to send
            });
            const result = await response.json();
            setPrivacyPolicyData(result?.privacyPolicy?.content)
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }

    useEffect(() => {
        getPrivacyPolicyContent();
    })
    return (
        <div className='privacy-policy-main-container'>
            <div className='policy-container'>
                <div dangerouslySetInnerHTML={{ __html: privacyPolicyData }} ></div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
