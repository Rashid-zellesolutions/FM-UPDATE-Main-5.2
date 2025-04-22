import React, { useEffect, useState } from "react";
import "./termsConditionsModal.css";
import { url } from "../../utils/api";
import { IoClose } from "react-icons/io5";

const TermsConditionsModal = ({ openModal, closeModal }) => {
  const [termsContent, setTermsContent] = useState("");

  useEffect(() => {
    if (openModal) {
      fetchTermsConditions();
    }
  }, [openModal]);

  const fetchTermsConditions = async () => {
    try {
      const response = await fetch(`${url}/api/v1/pages/terms-conditions/get`); // Replace with your API URL
      const data = await response.json();
      setTermsContent(data?.termsConditions?.content); // Assuming the API returns { terms: "<p>Your content here</p>" }
    } catch (error) {
      console.error("Failed to fetch terms and conditions:", error);
    }
  };

  return (
    <div
      className={`html-modal-main-container ${openModal ? "show-html-modal" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      <div className="html-modal-inner-container">
      <button className="term-condition-modal-close-button" onClick={closeModal}>
        <IoClose size={30} color="#595959" />
      </button>
        <div className="html-modal-inner-sub-container">
          {termsContent ? (
            <div dangerouslySetInnerHTML={{ __html: termsContent }} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsModal;
