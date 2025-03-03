import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './context/productsContext/productContext';
import { CartProvider } from './context/cartContext/cartContext';
import { NavigationProvider } from './context/BreadCrumbContext/NavigationContext';
import { OrderProvivder } from './context/orderContext/orderContext';
import { SingleProductProvider } from './context/singleProductContext/singleProductContext';
import { AddCartProvider } from './context/AddToCart/addToCart';
import { MyOrdersProvider } from './context/orderContext/ordersContext';
import ScrollToTop from './utils/ScrollToTop/ScrollToTop';
import { VariationProvider } from './context/BreadCrumbContext/variationsContext';
import { LPContentProvider } from './context/LPContentContext/LPContentContext';
import { WishListProvider } from './context/wishListContext/wishListContext';
import { ProductPageProvider } from './context/ProductPageContext/productPageContext';
import { HelmetProvider } from 'react-helmet-async';
import { SEOctxProvider } from './context/SEOcontext/SEOcontext';
import { GlobalContextProvider } from './context/GlobalContext/globalContext';
import { ActiveSalePageProvider } from './context/ActiveSalePageContext/ActiveSalePageContext';
import { BlogsProvider } from './context/BlogsContext/blogsContext';
import { UserDashboardCtxProvider } from './context/userDashboardContext/userDashboard';
import { ProductArchiveProvider } from './context/ActiveSalePageContext/productArchiveContext';
import { AppointmentProvider } from './context/AppointmentContext/AppointmentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <UserDashboardCtxProvider>
        <SEOctxProvider>
          <CartProvider>
            <GlobalContextProvider>
              <BlogsProvider>
                <ActiveSalePageProvider>
                  <WishListProvider>
                    <LPContentProvider>
                      <OrderProvivder>
                        <NavigationProvider>
                          <AddCartProvider>
                            <ProductProvider>
                              <AppointmentProvider>
                                <SingleProductProvider>
                                  <MyOrdersProvider>
                                    <ProductPageProvider>
                                      <VariationProvider>
                                        <ProductArchiveProvider>
                                          <Provider store={store}>
                                            <Router>
                                              <ScrollToTop>
                                                <App />
                                              </ScrollToTop>
                                            </Router>
                                          </Provider>
                                        </ProductArchiveProvider>
                                      </VariationProvider>
                                    </ProductPageProvider>
                                  </MyOrdersProvider>
                                </SingleProductProvider>
                              </AppointmentProvider>
                            </ProductProvider>
                          </AddCartProvider>
                        </NavigationProvider>
                      </OrderProvivder>
                    </LPContentProvider>
                  </WishListProvider>
                </ActiveSalePageProvider>
              </BlogsProvider>
            </GlobalContextProvider>
          </CartProvider>
        </SEOctxProvider>
      </UserDashboardCtxProvider>
    </HelmetProvider>
  </React.StrictMode>
);