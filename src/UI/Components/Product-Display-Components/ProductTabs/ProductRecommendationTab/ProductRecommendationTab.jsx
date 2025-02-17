import React from 'react'
import './ProductRecommendationTab.css'
import SimillerProducts from '../../../SimillerProducts/SimillerProducts'
import FrequentlyBought from '../../../FrequentlyBought/FrequentlyBought'

const ProductRecommendationTab = ({id, recommendationRef, product}) => {
  return (
    <div
      id={'Recommendations'}
      ref={recommendationRef}
      className='product-recommendation-main-container'
    >
      {product?.collection?.length > 0 && <SimillerProducts isPadding={false} collection={product?.collection} />}
      {product?.related_products?.length > 0 && <FrequentlyBought isPadding={false} relatedProducts={product?.related_products} />}
    </div>
  )
}

export default ProductRecommendationTab
