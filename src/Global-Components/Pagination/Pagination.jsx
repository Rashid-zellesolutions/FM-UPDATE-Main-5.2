import React from 'react';
import './Pagination.css';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Pagination = ({ activePageIndex, totalPages, handleActivePage, handlePrevPage, handleNextPage }) => {
    return (
        <div className='view-more-products-button-div'>

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
                        Prev
                    </span>
                    {Array.from({ length: totalPages?.totalPages }).map((_, index) => {

                        const pageNumber = index + 1;
                        const shouldShow =
                            pageNumber === activePageIndex ||
                            pageNumber === activePageIndex - 1 ||
                            pageNumber === activePageIndex + 1 ||
                            (activePageIndex === 1 && pageNumber === 3) ||
                            (activePageIndex === totalPages?.totalPages && pageNumber === totalPages?.totalPages - 2);

                        return shouldShow ? (
                            <span
                                key={pageNumber}
                                onClick={() => handleActivePage(pageNumber)}
                                className={activePageIndex === pageNumber ? 'active-page-span' : ''}
                            >
                                {pageNumber}
                            </span>
                        ) : null;
                    })}
                    <span
                        className={activePageIndex === totalPages?.totalPages ? 'disabled' : ''}
                        onClick={handleNextPage}
                        style={{
                            pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                            color: activePageIndex === totalPages?.totalPages ? '#ccc' : '#4487C5',
                        }}
                    >
                        Next
                        <FaRegArrowAltCircleRight
                            size={18}
                            style={{
                                pointerEvents: activePageIndex === totalPages?.totalPages ? 'none' : 'auto',
                                color: activePageIndex === totalPages?.totalPages ? '#ccc' : '#4487C5',
                            }}
                        />
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Pagination
