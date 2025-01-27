import React, { useEffect, useState } from 'react';
import './BreadCrumb.css';
import { useLocation, Link } from 'react-router-dom';
import { useNavigation } from '../../context/BreadCrumbContext/NavigationContext';
import { FaHouseChimney } from 'react-icons/fa6';
import rightArrow from "../../Assets/right-arrow.png";

const Breadcrumb = ({ category, productName, sku, categorySlug }) => {
    const [parentCategory, setParentCategory] = useState(null)
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('product')) {
            // Set the parent category if the route is a product page
            const mainCategory = category?.find(main => main.is_main === 1);
            setParentCategory(mainCategory ? mainCategory.name : null);
        } else {
            // Reset parent category if not on a product page
            setParentCategory(null);
        }
    }, [category, location.pathname]);

    const { navigationHistory } = useNavigation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Combine navigation history and current pathnames
    const fullPathNames = [...navigationHistory, ...pathnames];

    if (fullPathNames.length === 0) {
        return null; // Don't show anything if on the home page
    }

    return (
        <nav>
            <ol className="bread-crumb-list">
                {/* Home Link */}
                <li style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to="/">
                        <FaHouseChimney style={{ height: "20px", width: "20px" }} />
                    </Link>
                </li>

                {/* Dynamic Breadcrumb Links */}
                {fullPathNames.map((pathname, index) => {
                    // Determine if the current route is the product page
                    const isProductPage = location.pathname.includes('product') && index === fullPathNames.length - 1;


                    // Determine if the current route is the category
                    const isCategory = pathname === 'product' && parentCategory?.name;

                    const name = isProductPage && productName
                        ? productName // Use SKU if on product page
                        : pathname === 'product' && parentCategory
                            ? parentCategory
                            : isCategory
                                ? category // Replace "single-product" with category
                                : pathname
                                    .split('-') // Split slug into words
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                                    .join(' '); // Join words with spaces
                    // : pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' '); // Default name
                    const routeTo = isProductPage && categorySlug && index === fullPathNames.length - 1
                        ? `/product/${sku}`  // Ensure that SKU does not redirect to the category page
                        : isCategory
                            ? `/${categorySlug}` // Go to categorySlug for category links
                            : `/${fullPathNames.slice(0, index + 1).join('/')}`; // Default behavior */}
                    //  Dynamic Breadcrumb Links 

                    return (
                        <li
                            className={`bread_links`}
                            style={
                                {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }
                            }
                            key={routeTo}
                        >
                            <span >
                                <img
                                    src={rightArrow}
                                    style={
                                        { height: "12px", width: "12px" }
                                    }
                                    alt="arrow"
                                />
                            </span>
                            {index === fullPathNames.length - 1 ? (
                                <span
                                    className={`bread_links_sub active ${index === fullPathNames.length - 1 ? 'active-last-bread-link' : ''}`}
                                    style={{ marginLeft: "5px", fontSize: "16px", marginBottom: "1px" }}
                                >
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    className="bread_links_sub"
                                    style={{ marginLeft: "5px", fontSize: "16px", marginBottom: "1px" }}
                                    to={routeTo}
                                >
                                    {name}
                                </Link>
                            )}

                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;


