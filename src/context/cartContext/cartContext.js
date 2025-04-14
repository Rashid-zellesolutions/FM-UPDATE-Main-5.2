import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { url } from "../../utils/api";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    // const url = "http://localhost:8080";

    const [eachProtectionValue, setEachProtectionValue] = useState(150); // 99 was old single protection price
    const [eachProtectionValue2, setEachProtectionValue2] = useState(200); // 99 was old single protection price
    const [totalProtectionValue, setTotalProtectionValue] = useState(200);
    const [professionalAssemblyValue, setProfessionalAssemblyValue] = useState(210); // 199 was old all protection price

    const [cartUid, setCartUid] = useState(() => {
        const cart_uid = localStorage.getItem('cartUid');
        return cart_uid ? cart_uid : null;
    });

    const [cartProducts, setCartProducts] = useState(() => {
        const savedCart = localStorage.getItem('cart2');
        return savedCart ? JSON.parse(savedCart) : { products: [], is_all_protected: 0, is_professional_assembly: 0 };
    });

    const [isCartProtected, setIsCartProtected] = useState(() => {
        const savedCart = localStorage.getItem('cart2');
        const savedIsAllProtected = savedCart ? JSON.parse(savedCart).is_all_protected : 0;
        return savedIsAllProtected === 1;
    });

    const [isProfessionalAssembly, setIsProfessionalAssembly] = useState(() => {
        const savedCart = localStorage.getItem('cart2');
        const savedIsProfessionalAssembly = savedCart ? JSON.parse(savedCart).is_professional_assembly : 0;
        return savedIsProfessionalAssembly === 1; // If saved value is 1, set true; otherwise, false
    });

    const [custToken, setCustToken] = useState(() => {
        const userToken = localStorage.getItem('userToken');
        return userToken ? userToken : null;
    });

    const [uuid, setUuid] = useState(() => {
        const userUid = localStorage.getItem('uuid');
        return userUid ? userUid : null;
    });



    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        const storedCart2 = localStorage.getItem('cart2');
        if (storedCart2) {
            setCartProducts(JSON.parse(storedCart2));
        }
        const cart_uid = localStorage.getItem('cartUid');
        if (cart_uid) {
            setCartUid(cart_uid);
        }
    }, []);


    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cartSection, setCartSection] = useState(false);




    // initialize cart from local storage
    const [subTotal0, setSubTotal0] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [savings, setSavings] = useState(0);

    const [deliveryCharges, setDeliveryCharges] = useState(50)
    const [taxValue, setTaxValue] = useState(0);
    const [grandValue, setGrandValue] = useState(0);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    })



    // save cart to local storage when eer it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])
    // save cart to local storage when eer it changes
    useEffect(() => {
        localStorage.setItem('cart2', JSON.stringify(cartProducts));
    }, [cartProducts])

    useEffect(() => {
        localStorage.setItem('cartUid', cartUid);
    }, [cartUid])

    const resetCart = () => {
        setCartProducts({ products: [], is_all_protected: 0, is_professional_assembly: 0 }); // Clear the cart state
        localStorage.removeItem("cart2"); // Remove cart from localStorage
    };

    const resetCart0 = () => {
        setCartProducts([]); // Clear the cart state
        localStorage.removeItem("cart2"); // Remove cart from localStorage
    };

    const [singleProduct, setSingleProduct] = useState(() => {
        const savedSingleProduct = localStorage.getItem('singleProduct');
        return savedSingleProduct ? JSON.parse(savedSingleProduct) : []
    });

    useEffect(() => {
        const storedSingleProduct = localStorage.getItem('singleProduct');
        if (storedSingleProduct) {
            setSingleProduct(JSON.parse(storedSingleProduct));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('singleProduct', JSON.stringify(singleProduct));
    }, [singleProduct])



    const updateCartDB = async (updatedCart) => {
        try {

            const cartUid = localStorage.getItem('cartUid');
            console.log(cartUid,"here is vlue of cart uid")
    
            // Check if cartUid is truly undefined or null
            const isCartUidInvalid = !cartUid || cartUid === "undefined" || cartUid === "null";
    
            const method = isCartUidInvalid ? "post" : "put";




            // Ensure state update reflects before API call
            const isUserAnonymous = (localStorage.getItem('uuid') && localStorage.getItem('userToken')) ? false : true;
            const uuid = localStorage.getItem('uuid');
            const custToken = localStorage.getItem('userToken');
            await new Promise((resolve) => setTimeout(resolve, 0));


            // Send updated cart to API
            let response;

            if (method === "post") {
                 response = isUserAnonymous ? await axios.post(
                    `${url}/api/v1/unused-cart/add`,
                    { cart: updatedCart }
                ) : await axios.post(
                    `${url}/api/v1/customer/unused-cart/add`,
                    { cart: updatedCart, userId: uuid },
                    { headers: { authorization: `${custToken}`, "Content-Type": "application/json" } }
                );
                method === "post" && setCartUid(response?.data?.data?._id);
            } else if (method === "put") {
                 response = isUserAnonymous ? await axios.put(
                    `${url}/api/v1/unused-cart/edit/${cartUid}`,
                    { cart: updatedCart }
                ) : await axios.put(
                    `${url}/api/v1/customer/unused-cart/edit/${cartUid}`,
                    { cart: updatedCart, userId: uuid },
                    { headers: { authorization: `${custToken}`, "Content-Type": "application/json" } }
                );
            }else{
                
            }

          

            console.log("API Response:", response.data);
            setIsCartLoading(false);
            return response.data;
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };








    const addSingleProduct = (product) => {
        setSingleProduct((prevState) => ({
            ...product,
            quantity: prevState.quantity || 1,
            is_protected: 0
        }))
    }

    const handleCartProtected = async () => {
        console.log("HandleProtection Clicked");
        setIsCartLoading(true);
        try {
            // Toggle `isCartProtected`
            setIsCartProtected((prev) => !prev);

            // Compute updated cart state
            let newCart;
            setCartProducts((prevCart) => {
                newCart = {
                    ...prevCart,
                    is_all_protected: prevCart.is_all_protected === 0 ? 1 : 0, // Toggle between 0 and 1
                };
                return newCart;
            });

            // Ensure state is updated
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Pass the computed object to updateCartDB
            return await updateCartDB(newCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };

    const handleCartAssembly = async () => {
        setIsCartLoading(true);
        try {
            // Toggle assembly state
            setIsProfessionalAssembly((prev) => !prev);

            // Compute updated cart state
            let newCart;
            setCartProducts((prevCart) => {
                newCart = {
                    ...prevCart,
                    is_professional_assembly: prevCart.is_professional_assembly === 0 ? 1 : 0, // Toggle between 0 and 1
                };
                return newCart;
            });

            // Ensure state is updated
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Pass the computed object to updateCartDB
            return await updateCartDB(newCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };



    // Add Items To Cart
    const addToCart = (product, LocalQuantity, isProtected) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.product.uid === product.uid);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.product.uid === product.uid ? {
                        ...item.product,
                        product: {
                            ...item.product,
                            quantity: LocalQuantity,
                        }
                    } : item
                );

            } else {
                const newProduct = {
                    product: {
                        ...product,
                        // is_protected: isProtected ? 1 : 0,
                        // protected_value: isProtected ? 99 : 0,
                        quantity: LocalQuantity,
                        sub_total: parseFloat(product.regular_price) * (product.quantity || 1),
                        total_price: parseFloat(product.regular_price) * (product.quantity || 1)
                    }
                };
                return [...prevCart, newProduct]

            }
        })

    };

    //     const addToCart0 = async (product, variationData, isProtected, quantity) => {
    //         setIsCartLoading(true);
    //         console.log('Cart UID:', cartUid);

    //         if (cartUid === "undefined" || cartUid === "null") {
    //             console.log('Cart is null, adding products');

    //             // 🛠 Wait for state update before making API call
    //             const newCart = await new Promise((resolve) => {
    //                 setCartProducts((prev) => {
    //                     const updatedProducts = prev.products || [];

    //                     const existingProduct =
    //                         product.type === "simple"
    //                             ? updatedProducts.find((item) => item.product_uid === product?.uid)
    //                             : updatedProducts.find((item) => item.variation_uid === variationData?.uid);

    //                     let updatedCart;

    //                     if (existingProduct) {
    //                         updatedCart = {
    //                             ...prev,
    //                             products: updatedProducts.map((item) =>
    //                                 product.type === "simple"
    //                                     ? item.product_uid === product.uid
    //                                         ? { ...item, quantity: item.quantity + parseInt(quantity) }
    //                                         : item
    //                                     : item.variation_uid === product.default_variation
    //                                         ? { ...item, quantity: item.quantity + parseInt(quantity) }
    //                                         : item
    //                             ),
    //                         };
    //                     } else {
    //                         updatedCart = {
    //                             ...prev,
    //                             products: [
    //                                 ...updatedProducts,
    //                                 {
    //                                     product_uid: product?.uid,
    //                                     name: product?.name,
    //                                     isVariable: product?.type === "simple" ? 0 : 1,
    //                                     variation_uid: product?.type === "simple" ? 0 : variationData?.uid,
    //                                     image: product?.type === "simple" ? product?.image : variationData?.images?.[0],
    //                                     attributes: product.type === "simple" ? product.attributes : variationData?.attributes,
    //                                     sale_price: product.type === "simple" ? product.sale_price : variationData?.sale_price,
    //                                     regular_price: product.type === "simple" ? product.regular_price : variationData?.regular_price,
    //                                     quantity: parseInt(quantity),
    //                                     sku: product.type === "simple" ? product.sku : variationData?.sku,
    //                                     is_protected: isProtected,
    //                                 },
    //                             ],
    //                         };
    //                     }

    //                     console.log("Updated Cart:", updatedCart);
    //                     resolve(updatedCart); // ✅ Resolve Promise
    //                     return updatedCart; // ✅ Update state
    //                 });
    //             });

    //             try {
    //                 const response = await axios.post("${url}/api/v1/unused-cart/add", { cart: newCart });
    //                 console.log("API Response:", response.data,response?.data?.data?._id);
    //                 setCartUid(response?.data?.data?._id); // ✅ Corrected response handling
    //                setCartSection(true)
    //                setIsCartLoading(false);
    //                 return response.data; // ✅ Return response data
    //             } catch (error) {
    //                 console.error("Error adding to cart:", error);
    // //setCartSection(true)
    // setIsCartLoading(false);
    //                 throw error;
    //             }

    //         } else {
    //             console.log('Cart UID exists, updating products');

    //             const newCart = await new Promise((resolve) => {
    //                 setCartProducts((prev) => {
    //                     const updatedProducts = prev.products || [];

    //                     const existingProduct =
    //                         product.type === "simple"
    //                             ? updatedProducts.find((item) => item.product_uid === product?.uid)
    //                             : updatedProducts.find((item) => item.variation_uid === variationData?.uid);

    //                     let updatedCart;

    //                     if (existingProduct) {
    //                         updatedCart = {
    //                             ...prev,
    //                             products: updatedProducts.map((item) =>
    //                                 product.type === "simple"
    //                                     ? item.product_uid === product.uid
    //                                         ? { ...item, quantity: item.quantity + parseInt(quantity) }
    //                                         : item
    //                                     : item.variation_uid === product.default_variation
    //                                         ? { ...item, quantity: item.quantity + parseInt(quantity) }
    //                                         : item
    //                             ),
    //                         };
    //                     } else {
    //                         updatedCart = {
    //                             ...prev,
    //                             products: [
    //                                 ...updatedProducts,
    //                                 {
    //                                     product_uid: product?.uid,
    //                                     name: product?.name,
    //                                     isVariable: product?.type === "simple" ? 0 : 1,
    //                                     variation_uid: product?.type === "simple" ? 0 : variationData?.uid,
    //                                     image: product?.type === "simple" ? product?.image : variationData?.images?.[0],
    //                                     attributes: product.type === "simple" ? product.attributes : variationData?.attributes,
    //                                     sale_price: product.type === "simple" ? product.sale_price : variationData?.sale_price,
    //                                     regular_price: product.type === "simple" ? product.regular_price : variationData?.regular_price,
    //                                     quantity: parseInt(quantity),
    //                                     sku: product.type === "simple" ? product.sku : variationData?.sku,
    //                                     is_protected: isProtected,
    //                                 },
    //                             ],
    //                         };
    //                     }

    //                     console.log("Updated Cart:", updatedCart);
    //                     resolve(updatedCart); // ✅ Resolve Promise
    //                     return updatedCart; // ✅ Update state
    //                 });
    //             });

    //             try {
    //                 const response = await axios.put(`${url}/api/v1/unused-cart/edit/${cartUid}`, { cart: newCart });

    //                 console.log("API Response:", response.data);

    //                 await new Promise((resolve) => setTimeout(resolve, 0)); // Ensures React processes state updates correctly

    //                 setCartSection(true); // ✅ Now executes after the API response is handled
    //                 setIsCartLoading(false);
    //                 return response.data;
    //             } catch (error) {
    //                 console.error("Error updating cart:", error);
    //                 setIsCartLoading(false);
    //                 throw error; // Avoid calling setCartSection on error if not needed
    //             }

    //         }
    //     };







    const updateCartAPI = async (url, newCart, method) => {
        try {
            const response = method === "post" ? await axios.post(url, { cart: newCart }) : await axios.put(url, { cart: newCart });
            console.log("API Response:", response.data);
            setCartSection(true);
            setIsCartLoading(false);
            method === "post" && setCartUid(response?.data?.data?._id);
            setCartSection(true);
            return response.data;
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };


    const updateCartAPI2 = async (url0, newCart, method, custToken, userId) => {
        console.log(url0, newCart, method, custToken, userId, "here all")
        try {
            const response = method === "post" ?
                await axios.post(url0, { cart: newCart, userId: userId }, { headers: { authorization: `${custToken}`, "Content-Type": "application/json" } }) :
                await axios.put(url0, { cart: newCart, userId: userId }, { headers: { authorization: `${custToken}`, "Content-Type": "application/json" } });
            console.log("API Response:", response.data);
            method === "post" && setCartUid(response?.data?.data?._id);
            setCartSection(true);
            setIsCartLoading(false);
            return response.data;
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            setCartSection(true);
            throw error;
        }
    };

    const addToCart0 = async (product, variationData, isProtected, quantity) => {
        setIsCartLoading(true);

        const isSimple = product.type === "simple";
        const productUid = isSimple ? product.uid : variationData?.uid;

        const newCart = await new Promise((resolve) => {
            setCartProducts((prev) => {
                const updatedProducts = prev.products || [];
                const existingProduct = updatedProducts.find((item) =>
                    isSimple ? item.product_uid === productUid : item.variation_uid === productUid
                );

                const updatedCart = {
                    ...prev,
                    products: existingProduct
                        ? updatedProducts.map((item) =>
                            (isSimple ? item.product_uid : item.variation_uid) === productUid
                                ? { ...item, quantity: item.quantity + parseInt(quantity) }
                                : item
                        )
                        : [
                            ...updatedProducts,
                            {
                                product_uid: product?.uid,
                                name: product?.name,
                                isVariable: isSimple ? 0 : 1,
                                variation_uid: isSimple ? 0 : variationData?.uid,
                                image: isSimple ? product?.image : variationData?.images?.[0],
                                attributes: isSimple ? product.attributes : variationData?.attributes,
                                sale_price: isSimple ? product.sale_price : variationData?.sale_price,
                                regular_price: isSimple ? product.regular_price : variationData?.regular_price,
                                quantity: parseInt(quantity),
                                sku: isSimple ? product.sku : variationData?.sku,
                                is_protected: isProtected,
                            },
                        ],
                };

                console.log("Updated Cart:", updatedCart);
                resolve(updatedCart);
                return updatedCart;
            });
        });

        const cartUid = localStorage.getItem('cartUid');
        console.log(cartUid,"here is vlue of cart uid")

        // Check if cartUid is truly undefined or null
        const isCartUidInvalid = !cartUid || cartUid === "undefined" || cartUid === "null";

        const apiUrl0 = isCartUidInvalid
            ? `${url}/api/v1/unused-cart/add`
            : `${url}/api/v1/unused-cart/edit/${cartUid}`;

        const apiUrl1 = isCartUidInvalid
            ? `${url}/api/v1/customer/unused-cart/add`
            : `${url}/api/v1/customer/unused-cart/edit/${cartUid}`;

        const method = isCartUidInvalid ? "post" : "put";

        const isUserAnonymous = !localStorage.getItem('uuid') || !localStorage.getItem('userToken');


        // return updateCartAPI(apiUrl, newCart, method);
        return isUserAnonymous ? updateCartAPI(apiUrl0, newCart, method) : updateCartAPI2(apiUrl1, newCart, method, localStorage.getItem('userToken'), localStorage.getItem('uuid'));
    };















    const addSingleProtection = async (uid, isVariable = false) => {
        setIsCartLoading(true);
        try {
            let updatedCart;
            setCartProducts((prevCart) => {
                updatedCart = {
                    ...prevCart,
                    products: prevCart.products.map((item) => {
                        if (isVariable) {
                            if (item.variation_uid === uid) {
                                return { ...item, is_protected: 1 }; // Set is_protected to 0 for variable product
                            }
                        } else {
                            if (item.product_uid === uid) {
                                return { ...item, is_protected: 1 }; // Set is_protected to 0 for simple product
                            }
                        }
                        return item; // Return the item unchanged if no match
                    }),
                }
                return updatedCart;
            });
            await new Promise((resolve) => setTimeout(resolve, 0));
            return await updateCartDB(updatedCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };

    const removeProtection = async (uid, isVariable = false) => {
        setIsCartLoading(true);
        try {
            let updatedCart;
            setCartProducts((prevCart) => {
                updatedCart = {
                    ...prevCart,
                    products: prevCart.products.map((item) => {
                        if (isVariable) {
                            if (item.variation_uid === uid) {
                                return { ...item, is_protected: 0 }; // Set is_protected to 0 for variable product
                            }
                        } else {
                            if (item.product_uid === uid) {
                                return { ...item, is_protected: 0 }; // Set is_protected to 0 for simple product
                            }
                        }
                        return item; // Return the item unchanged if no match
                    }),
                }
                return updatedCart;
            });
            await new Promise((resolve) => setTimeout(resolve, 0));
            return await updateCartDB(updatedCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };

    const removeFromCart = async (uid, isVariable = false) => {
        setIsCartLoading(true);
        try {
            let updatedCart;
            setCartProducts((prevCart) => {
                updatedCart = {
                    ...prevCart,
                    products: prevCart.products.filter((item) =>
                        isVariable
                            ? item.variation_uid !== uid // Remove by variation_uid for variable products
                            : item.product_uid !== uid   // Remove by product_uid for simple products
                    ),
                }
                return updatedCart;
            });
            await new Promise((resolve) => setTimeout(resolve, 0));
            return await updateCartDB(updatedCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };

    const increamentQuantity = async (uid, isVariable = false) => {
        setIsCartLoading(true);
        try {
            // Compute updated cart before setting state
            let updatedCart;
            setCartProducts((prevCart) => {
                updatedCart = {
                    ...prevCart,
                    products: prevCart.products.map((item) => {

                        // Check if it's a variable product and increment based on variation_uid
                        if (isVariable && item.variation_uid === uid) {
                            return {
                                ...item,
                                quantity: item.quantity + 1,
                                sub_total: (item.quantity + 1) * parseFloat(item.sale_price || item.regular_price || 0),
                                total_price: (item.quantity + 1) * parseFloat(item.sale_price || item.regular_price || 0),
                            };
                        }

                        // For simple products, increment based on product_uid
                        if (!isVariable && item.product_uid === uid) {
                            return {
                                ...item,
                                quantity: item.quantity + 1,
                                sub_total: (item.quantity + 1) * parseFloat(item.sale_price || item.regular_price || 0),
                                total_price: (item.quantity + 1) * parseFloat(item.sale_price || item.regular_price || 0),
                            };
                        }

                        // Return item unchanged if no match
                        return item;
                    })
                }
                return updatedCart;
            });
            await new Promise((resolve) => setTimeout(resolve, 0));
            return await updateCartDB(updatedCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };

    const decreamentQuantity = async (uid, isVariable = false) => {
        setIsCartLoading(true);
        try {
            // Compute updated cart before setting state
            let updatedCart;

            setCartProducts((prevCart) => {
                updatedCart = {
                    ...prevCart,
                    products: prevCart.products.map((item) => {
                        if (
                            (isVariable && item.variation_uid === uid && item.quantity <= 1) ||
                            (!isVariable && item.product_uid === uid && item.quantity <= 1)
                        ) {
                            return item;
                        }

                        if (isVariable && item.variation_uid === uid) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        if (!isVariable && item.product_uid === uid) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    }),
                };

                return updatedCart;
            });

            await new Promise((resolve) => setTimeout(resolve, 0));
            return await updateCartDB(updatedCart);
        } catch (error) {
            console.error("Error updating cart:", error);
            setIsCartLoading(false);
            throw error;
        }
    };



    const calculateTotalPrice = () => {
        if (!Array.isArray(cartProducts.products)) {
            console.error("Invalid Array", cartProducts);
            return { total: 0, savings: 0 };
        }

        let total = 0;
        let savings = 0;

        cartProducts.products.forEach(item => {
            const regularPrice = parseFloat(item.regular_price) || 0;
            const salePrice = item.sale_price !== "0" ? parseFloat(item.sale_price) : regularPrice;
            const quantity = item.quantity || 1;
            const isProtectedValue = isCartProtected ? 0 : (item.is_protected === 0 ? 0 : item.quantity > 1 ? eachProtectionValue2 : eachProtectionValue);

            // Calculate total price
            total += (salePrice * quantity) + isProtectedValue;

            // Calculate savings
            savings += (regularPrice - salePrice) * quantity;
        });
        setSubTotal0(total);
        setSubTotal(total + (isCartProtected ? totalProtectionValue : 0) + (isProfessionalAssembly ? professionalAssemblyValue : 0));

        // Assuming you have a state or method to update the savings
        setSavings(savings);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [cartProducts]);

    return (
        <CartContext.Provider value={
            {
                cart,
                addToCart,
                removeFromCart,
                increamentQuantity,
                decreamentQuantity,
                calculateTotalPrice,
                addSingleProduct,
                subTotal,
                subTotal0,
                taxValue,
                deliveryCharges,
                grandValue,
                resetCart,
                addSingleProtection,
                removeProtection,
                isCartProtected,
                setIsCartProtected,
                isProfessionalAssembly,
                handleCartProtected,
                handleCartAssembly,
                addToCart0,
                cartUid,
                setCartUid,
                cartProducts,
                eachProtectionValue,
                eachProtectionValue2,
                setEachProtectionValue,
                savings,
                setSavings,
                totalProtectionValue,
                setTotalProtectionValue,
                professionalAssemblyValue,
                setProfessionalAssemblyValue,
                cartSection,
                setCartSection,
                isCartLoading, setIsCartLoading
            }
        }>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);