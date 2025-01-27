import React, { useState, useEffect } from 'react';
import './SizeVariant.css';
import { url } from '../../../utils/api';
import { useProductPage } from '../../../context/ProductPageContext/productPageContext';

const SizeVariant = ({
    productType,
    attributes,
    productData,
    handleSelectColor,
    handleSelectVariation,
    handleSelectedVariationData,
}) => {
    const { selectedVariationData, setSelectedVariationData } = useProductPage();
    const [colorVariation, setColorVariation] = useState();
    const [imageVariation, setImageVariation] = useState(0);
    const [selectedImageName, setSelectedImageName] = useState();
    const [selectedColorName, setSelectedColorName] = useState();
    const [selectedSelectAttrs, setSelectedSelectAttrs] = useState({}); // For multiple select attributes
    
    let defaultSelections = {};
    useEffect(() => {
        if (attributes && attributes.length > 0 && productData?.length > 0) {
            let defaultSelections = {};
            if (productType === 'simple') {
                // Automatically select all variations for simple products
                attributes.forEach(attr => {
                    defaultSelections[attr.name] = attr.options?.[0]?.value;
                });
                setSelectedSelectAttrs(defaultSelections); // Set all attributes selected
                const defaultVariation = productData[0]; // Default to the first variation
                if (defaultVariation) {
                    handleSelectedVariationData(defaultVariation.uid); // Notify parent
                    setSelectedVariationData(defaultVariation); // Set the first variation
                }
            } 
            else {
                let initialVariation = selectedVariationData;

                if (!initialVariation && productData?.length > 0) {
                    initialVariation = productData[0]; // Default to the first variation
                }

                if (initialVariation) {
                    // Initialize attributes from the default variation
                    initialVariation.attributes.forEach(attr => {
                        defaultSelections[attr.name] = attr.options?.[0]?.value;
                    });
                    
                    setSelectedVariationData(initialVariation); // Set context
                    handleSelectedVariationData(initialVariation.uid); // Notify parent
                }
            }
            setSelectedSelectAttrs(defaultSelections); // Initialize selected attributes
        }else{
             if (productType === 'simple') {
                // Automatically select all variations for simple products
                attributes.forEach(attr => {
                    defaultSelections[attr.name] = attr.options?.[0]?.value;
                });
                setSelectedSelectAttrs(defaultSelections); // Set all attributes selected
                const defaultVariation = productData[0]; // Default to the first variation
                if (defaultVariation) {
                    handleSelectedVariationData(defaultVariation.uid); // Notify parent
                    setSelectedVariationData(defaultVariation); // Set the first variation
                }
            }
        }
    }, [attributes, productData, selectedVariationData, productType, handleSelectedVariationData]);



    // Handle Image Selection
    const handleImageVariation = (attributeName, index, name, value) => {
        setImageVariation(index); // Update image variation
        setSelectedImageName(name); // Optionally store image name

        // Update selected attributes to include the selected image
        setSelectedSelectAttrs((prevState) => {
            const updatedAttrs = {
                ...prevState,
                [attributeName]: value, // Update selected value for the attribute
            };

            // Now try to find the matching variation with all selected attributes
            const matchedVariation = productData.find((variation) => {
                return variation.attributes.every((attr) => {
                    const selectedValue = updatedAttrs[attr.name];
                    // Ensure you're comparing the value correctly based on the attribute type
                    return selectedValue === attr.options?.[0]?.value;
                });
            });

            if (matchedVariation) {
                handleSelectedVariationData(matchedVariation.uid); // Pass the matched UID
                setSelectedVariationData(matchedVariation); // Set the context with matched variation
            } else {
                console.log("No matching variation found");
            }

            return updatedAttrs; // Update the selected attributes
        });
    };


    // Handle Color Selection
    const handleClickColor = (attributeName, value, name) => {
        setSelectedSelectAttrs((prevState) => {
            const updatedAttrs = {
                ...prevState,
                [attributeName]: value, // Update selected value for the attribute
            };

            // Now try to find the matching variation with all selected attributes
            const matchedVariation = productData.find((variation) => {
                return variation.attributes.every((attr) => {
                    const selectedValue = updatedAttrs[attr.name];
                    // Ensure you're comparing the value correctly based on the attribute type
                    return selectedValue === attr.options?.[0]?.value;
                });
            });

            if (matchedVariation) {
                handleSelectedVariationData(matchedVariation.uid); // Pass the matched UID
                setSelectedVariationData(matchedVariation); // Set the context with matched variation
            } else {
                console.log("No matching variation found");
            }

            return updatedAttrs; // Update the selected attributes
        });
        handleSelectColor(value); // Call the parent handler for color
        setSelectedColorName(name); // Update selected color name
    };

    // Handle Select Attribute Selection
    const handleSelectClick = (attributeName, value, name) => {

        setSelectedSelectAttrs((prevState) => {
            const updatedAttrs = {
                ...prevState,
                [attributeName]: value, // Update selected value for the attribute
            };

            // Now try to find the matching variation with all selected attributes
            const matchedVariation = productData.find((variation) => {
                return variation.attributes.every((attr) => {
                    const selectedValue = updatedAttrs[attr.name];
                    // Ensure you're comparing the value correctly based on the attribute type
                    return selectedValue === attr.options?.[0]?.value;
                });
            });


            if (matchedVariation) {
                handleSelectedVariationData(matchedVariation.uid); // Pass the matched UID
                setSelectedVariationData(matchedVariation); // Set the context with matched variation
            } else {
                console.log("No matching variation found");
            }

            return updatedAttrs; // Update the selected attributes
        });

        handleSelectVariation(value); // Pass the selected value to the parent if needed
    };

    


    return (
        <>
            {attributes?.map((attribute) => (
                <div className="attributes-types" key={attribute.name}>
                    {attribute.type === 'color' ? (
                        <div className="attribute-type">
                            <h3 className="attribute-heading">
                                {/* {selectedColorName ? selectedColorName : attribute.name} */}
                                {attribute.name}
                            </h3>
                            <div className="attribute-variations">
                                {attribute.options.map((option, index) => (
                                    <div className="attribute-single-color" key={index}>
                                        <div title={option.name}
                                            className={`attribute-color-variation-box ${selectedSelectAttrs[attribute.name] === option.value
                                                    ? 'selected'
                                                    : ''
                                                }`}
                                            onClick={() => handleClickColor(attribute.name, option.value, option.name)}
                                            style={{
                                                backgroundColor: option.value,
                                            }}
                                        ></div>
                                        {/* <p className='quick-view-atribute-option-name'>{option.name}</p> */}
                                    </div>
                                ))}

                            </div>
                        </div>
                    ) : attribute.type === 'image' ? (
                        <div className="attribute-type">
                            <h3 className="attribute-heading">{attribute.name}</h3>
                            <div className="attribute-variations">
                                {attribute.options.map((option, index) => (
                                    <div
                                        className={`attribute-image-type`}
                                        key={index}
                                        onClick={() => handleImageVariation(attribute.name, index, option.name, option.value)}
                                    >
                                        <div
                                            className={`variation-image-div ${imageVariation === index
                                                    ? 'active-selected-image-variation'
                                                    : ''
                                                }`}
                                        >
                                            <img src={`${url}${option.value}`} alt={option.name} />
                                        </div>
                                        <p>{option.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : attribute.type === 'select' ? (
                        <div className="attribute-type">
                            <h3 className="attribute-heading">
                                {attribute.name}
                            </h3>
                            <div className="attribute-variations">
                                {attribute.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`select-type-attribute ${selectedSelectAttrs[attribute.name] === option.value
                                                ? 'select-select-variation'
                                                : ''
                                            }`}
                                        onClick={() =>
                                            handleSelectClick(
                                                attribute.name,
                                                option.value,
                                                option.name
                                            )
                                        }
                                    >
                                        <p>{option.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </>
    );
};

export default SizeVariant;
