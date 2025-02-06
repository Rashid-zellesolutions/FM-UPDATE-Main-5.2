import React from 'react'
import './FinancingAccount.css'
import financingCard from '../../../../Assets/icons/american-express.png';

const FinancingAccount = ({topHeadng, buttonText, askQuestion, applyText}) => {
  return (
    <div className='payment-type-financing-main-container'>
      <div className='payment-type-financing-heading'>
        <h3>{topHeadng}</h3>
        <img src={financingCard} alt='financing card' />
      </div>
      <div className='payment-type-financing-inputs-main'>
        <button>
          {buttonText}
        </button>
      </div>
      <span className='payment-type-financing-apply'>
        {askQuestion} <p>{applyText}</p>
      </span>
    </div>
  )
}

export default FinancingAccount
