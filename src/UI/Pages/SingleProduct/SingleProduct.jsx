import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import SingleProductStickySection from '../../Components/SingleProductStickySection/SingleProductStickySection';
import SimillerProducts from '../../Components/SimillerProducts/SimillerProducts';
import FrequentlyBought from '../../Components/FrequentlyBought/FrequentlyBought';
import RatingAndReview from '../../Components/RatingAndReview/RatingAndReview';
import ProductComments from '../../Components/ProductComments/ProductComments';
import OutdoorFaves from '../../Components/OutdoorFaves/OutdoorFaves';
import { useLocation, useParams } from 'react-router-dom';
import WriteReview from '../../Components/WriteReview/WriteReview';
import axios from 'axios';
import { url } from '../../../utils/api';

const SingleProduct = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state || null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async (productUid) => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/v1/reviews/get-by-product/${productUid}`);
      setReviews(response.data.reviews);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch reviews');
      setLoading(false);
    }
  };

  const fetchProductBySlug = async (slug) => {
    try {
      const response = await axios.get(`${url}/api/v1/products/get-by-slug/${slug}`);
      const fetchedProduct = response.data.products[0] || {};
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
    }
  };

  useEffect(() => {
    if (!product) {
      fetchProductBySlug(slug);
    } else if (product?.uid) {
      fetchReviews(product?.uid);
    }
  }, [product, slug]);

  useEffect(() => {fetchProductBySlug(slug)}, [slug])

  // if (!product) {
  //   return <div>Loading product...</div>;
  // }

  return (
    <div>
      <SingleProductStickySection productData={product} />
      {product?.collection?.length > 0 && <SimillerProducts collection={product?.collection} />}
      {product?.related_products?.length > 0 && <FrequentlyBought relatedProducts={product?.related_products} />}
      <RatingAndReview rating={product?.average_rating} data={reviews} reviews={reviews} loading={loading} error={error} />
      {loading && <div>Loading reviews...</div>}
      {error && <div>{error}</div>}
      <WriteReview product_id={product?.uid} review_enable={product?.enable_review} product_name={product?.name} product_permalink={"https://"} />
      <ProductComments review_enable={product?.enable_review} data={reviews} />
      <OutdoorFaves categories={product?.categories} />
    </div>
  );
};

export default SingleProduct;

