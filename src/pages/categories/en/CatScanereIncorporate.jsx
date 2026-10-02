import React from 'react';
import { Link } from 'react-router-dom';

export default function CatScanereIncorporate() {
  return (
    <div className="site__body">
      <app-product-category>
      <app-product-category>
        <div className="header">
          <app-page-header>
            <div className="page-header product-category bg-image" style={{ backgroundImage: 'url("/images/c683561a-6454-467f-8d53-210f2e4dbe40.5f912.jpg")' }}>
              <div className="overlay" style={{ background: 'transparent' }}></div>
              <div id="links" className="page-header__container container">
                <div className="page-header__title">
                  <h1>
                    Built-in barcode scanners
                  </h1>
                </div>
              </div>
            </div>
          </app-page-header>
          <div className="background-gradient">
            <div className="container"></div>
          </div>
          <app-page-header>
            <div className="page-header" style={{ backgroundImage: 'url()' }}>
              <div className="overlay" style={{ background: 'transparent' }}></div>
              <div id="links" className="page-header__container container"></div>
            </div>
            <div className="bottom-breadcrumbs">
              <div className="container">
                <nav ariaLabel="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="bc-item">
                      <a href="/en/">
                        Главная
                      </a>
                      <fa-icon size="1" className="ng-fa-icon bc-arrow">
                        <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10 fa-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                        </svg>
                      </fa-icon>
                    </li>
                    <li aria-current="page" className="bc-item active">
                      Built-in barcode scanners
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </app-page-header>
        </div>
        <div className="page full-background">
          <div className="container">
            <div className="shop-layout shop-layout--sidebar--start">
              <div className="shop-layout__content full-width">
                <div className="block">
                  <products-view offcanvas="mobile">
                    <div className="products-view">
                      <div className="products-view__list products-list">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/scan-rsc-1105-2d" style={{backgroundImage: "url('/images/6277c6db-337a-4d5c-a29a-0a18e7f365c7.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/scan-rsc-1105-2d" />
                                      <meta itemprop="name" content="ScanRSC 1105 2D" />
                                      <a href="/en/product/scan-rsc-1105-2d">
                                        ScanRSC 1105 2D
                                      </a>
                                    </div>
                                  </div>
                                  <div className="product-card-footer">
                                    <div className="left">
                                      <meta itemprop="price" content="" />
                                      <meta itemprop="priceCurrency" content="" />
                                      <meta itemprop="sku" content="" />
                                      <product-price-view>
                                        <div className="priceBox small">
                                          <div className="no-price">
                                            <div className="text">
                                               Сделать предзаказ в один{' '}
                                              <span>
                                                клик
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </product-price-view>
                                    </div>
                                    <div className="right">
                                      <div className="right-body">
                                        <img src="/images/shopping-bag.e9efb.svg" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </app-product-card>
                          </div>
                        </div>
                      </div>
                      <div className="products-view__pagination"></div>
                    </div>
                  </products-view>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <app-seo-text>
            <div className="seo-text" style={{ borderTop: 'none' }}>
              <div className="seo-content expand">
                <div className="bg-gradient"></div>
                <div>
                  <pre className="ql-syntax">
                    Built-in Built-in reader is one of the types of stationary scanner. It can be integrated into cash register, ATM or other equipment. Built-in scanners are used to check tickets, on passageways, in public transport, etc

                  </pre>
                  <p>
                    <br />
                  </p>
                </div>
              </div>
              <div className="extend-button">
                <div className="button">
                  <div>
                     Expand 
                  </div>
                  <div className="seo-arrow"></div>
                </div>
              </div>
            </div>
          </app-seo-text>
        </div>
      </app-product-category>
      </app-product-category>
    </div>
  );
}
