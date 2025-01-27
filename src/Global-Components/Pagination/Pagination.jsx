import React from 'react';
import './Pagination.css';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Pagination = ({activePageIndex, totalPages, handleActivePage, handlePrevPage, handleNextPage}) => {
    return (
        <div className='view-more-products-pagination-main'>
            <div className='pagination-buttons-container'>
                <span
                    className={activePageIndex === 1 ? 'disabled' : ''}
                    onClick={handlePrevPage}
                    style={{
                        pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                        color: activePageIndex === 1 ? '#ccc' : '#4487C5',
                    }}
                >
                    <FaRegArrowAltCircleLeft
                        size={18}
                        style={{
                            pointerEvents: activePageIndex === 1 ? 'none' : 'auto',
                            color: activePageIndex === 1 ? '#ccc' : '#4487C5',
                        }}
                    />
                    <p className='hide-on-mob'> Previous </p>
                </span>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        onClick={() => handleActivePage(index + 1)}
                        className={activePageIndex === index + 1 ? 'active-page-span' : ''}
                    >
                        {index + 1}
                    </span>
                ))}
                <span
                    className={activePageIndex === totalPages ? 'disabled' : ''}
                    onClick={handleNextPage}
                    style={{
                        pointerEvents: activePageIndex === totalPages ? 'none' : 'auto',
                        color: activePageIndex === totalPages ? '#ccc' : '#4487C5',
                    }}
                >
                    <p className='hide-on-mob'> Next </p>
                    <FaRegArrowAltCircleRight
                        size={18}
                        style={{
                            pointerEvents: activePageIndex === totalPages ? 'none' : 'auto',
                            color: activePageIndex === totalPages ? '#ccc' : '#4487C5',
                        }}
                    />
                </span>
            </div>
        </div>
    )
}

export default Pagination
