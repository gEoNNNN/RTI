import React from 'react';
import { Link } from 'react-router-dom';

export default function CatImprimante() {
  return (
    <div className="site__body">
      <app-product-category>
      <app-product-category>
        <div className="header">
          <app-page-header>
            <div className="page-header product-category bg-image" style={{ backgroundImage: 'url("https://cdn.rti.md//resize:fill:1980/q:80/plain/local:///public/product-categories/thumbnail/85760488-19f2-4b72-bbe8-da41d45f352e.jpg")' }}>
              <div className="overlay" style={{ background: 'transparent' }}></div>
              <div id="links" className="page-header__container container">
                <div className="page-header__title">
                  <h1>
                    Printers
                  </h1>
                </div>
              </div>
            </div>
          </app-page-header>
          <div className="background-gradient">
            <div className="container">
              <div className="subcategories">
                <div className="box-margin">
                  <a className="subCategory-card subCategory-card-all active" href="/en/category/imprimante">
                    <div className="subCategory-title">
                      Все
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/imprimante/imprimante-termice">
                    <div className="subCategory-title">
                      Thermal printers
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/imprimante/imprimante-de-etichete">
                    <div className="subCategory-title">
                      Ticket printer
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/imprimante/imprimante-portabile">
                    <div className="subCategory-title">
                      Mobile barcode label printer
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/imprimante/imprimante-industriale">
                    <div className="subCategory-title">
                      Industrial barcode label printer
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/imprimante/imprimante-de-carduri">
                    <div className="subCategory-title">
                      ID card printers
                    </div>
                  </a>
                </div>
              </div>
            </div>
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
                      Printers
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </app-page-header>
        </div>
        <div className="page">
          <app-page-subheader>
            <div className="container">
              <div className="page-subheader">
                <h2>
                  Все
                </h2>
              </div>
            </div>
          </app-page-subheader>
          <div className="container">
            <div className="shop-layout shop-layout--sidebar--start">
              <div className="shop-layout__content full-width">
                <div className="block">
                  <products-view offcanvas="mobile">
                    <div className="products-view">
                      <div className="products-view__list products-list has-pagination">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-de-etichete-citizen-cl-s321" style={{backgroundImage: "url('/images/6452f9e5-7cca-4a13-b98e-8574adc4661f.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-de-etichete-citizen-cl-s321" />
                                      <meta itemprop="name" content="Citizen CL-S321 label printer" />
                                      <a href="/en/product/imprimanta-de-etichete-citizen-cl-s321">
                                        Citizen CL-S321 label printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-mobila-citizen-cmp-30ii" style={{backgroundImage: "url('/images/a537cb7f-626a-400c-ba3f-9f806f315290.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-mobila-citizen-cmp-30ii" />
                                      <meta itemprop="name" content="Citizen CMP-30II Mobile Printer" />
                                      <a href="/en/product/imprimanta-mobila-citizen-cmp-30ii">
                                        Citizen CMP-30II Mobile Printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-portabila-citizen-cmp-40l" style={{backgroundImage: "url('/images/e7995221-4144-41fc-8a4d-175223c31409.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-portabila-citizen-cmp-40l" />
                                      <meta itemprop="name" content="Citizen CMP-40L Mobile Printer" />
                                      <a href="/en/product/imprimanta-portabila-citizen-cmp-40l">
                                        Citizen CMP-40L Mobile Printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-industriala-citizen-cl-e720" style={{backgroundImage: "url('/images/c39ebebd-266c-478e-8ac6-6c31f6dc9a06.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-industriala-citizen-cl-e720" />
                                      <meta itemprop="name" content="Citizen CL-E720 Industrial Printer" />
                                      <a href="/en/product/imprimanta-industriala-citizen-cl-e720">
                                        Citizen CL-E720 Industrial Printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-industriala-citizen-cl-s703" style={{backgroundImage: "url('/images/31482a84-d5df-44c8-a425-33faa2aacc1c.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-industriala-citizen-cl-s703" />
                                      <meta itemprop="name" content="Citizen CL-S703 Industrial Printer" />
                                      <a href="/en/product/imprimanta-industriala-citizen-cl-s703">
                                        Citizen CL-S703 Industrial Printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-termica-pos-citizen-ct-s310ii" style={{backgroundImage: "url('/images/e5409380-5b06-4350-ad78-0ebb7f2cd912.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-termica-pos-citizen-ct-s310ii" />
                                      <meta itemprop="name" content="POS Citizen CT-S310II thermal printer" />
                                      <a href="/en/product/imprimanta-termica-pos-citizen-ct-s310ii">
                                        POS Citizen CT-S310II thermal printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-de-etichete-citizen-cl-e300" style={{backgroundImage: "url('/images/33685a4f-e32f-4bcb-b460-6c8ebbc94d0c.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-de-etichete-citizen-cl-e300" />
                                      <meta itemprop="name" content="Labels printer Citizen CL-E300" />
                                      <a href="/en/product/imprimanta-de-etichete-citizen-cl-e300">
                                        Labels printer Citizen CL-E300
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-industriala-citizen-cl-s521ii" style={{backgroundImage: "url('/images/08078e31-81f5-4bb9-bc55-d559927316e9.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-industriala-citizen-cl-s521ii" />
                                      <meta itemprop="name" content="Citizen CL-S521II desktop industrial printer" />
                                      <a href="/en/product/imprimanta-industriala-citizen-cl-s521ii">
                                        Citizen CL-S521II desktop industrial printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-industriala-desktop-citizen-cl-s621ii" style={{backgroundImage: "url('/images/062a1ba2-fbde-4188-8e4f-fc9b1bf4c8b3.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-industriala-desktop-citizen-cl-s621ii" />
                                      <meta itemprop="name" content="Citizen CL-S621II industrial desktop printer" />
                                      <a href="/en/product/imprimanta-industriala-desktop-citizen-cl-s621ii">
                                        Citizen CL-S621II industrial desktop printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-portabila-citizen-cmp-20ii" style={{backgroundImage: "url('/images/85d0986b-9b0e-4664-883c-0b26bcae9217.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-portabila-citizen-cmp-20ii" />
                                      <meta itemprop="name" content="Citizen CMP-20II portable printer" />
                                      <a href="/en/product/imprimanta-portabila-citizen-cmp-20ii">
                                        Citizen CMP-20II portable printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-portabila-citizen-cmp-25l" style={{backgroundImage: "url('/images/eca638e8-7626-4100-b297-01bd2827ae2a.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-portabila-citizen-cmp-25l" />
                                      <meta itemprop="name" content="Citizen CMP-25L portable printer" />
                                      <a href="/en/product/imprimanta-portabila-citizen-cmp-25l">
                                        Citizen CMP-25L portable printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-de-etichete-citizen-e321" style={{backgroundImage: "url('/images/77283ead-f80c-4080-a52c-f4363c33a60c.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-de-etichete-citizen-e321" />
                                      <meta itemprop="name" content="Citizen CL-E321 label printer" />
                                      <a href="/en/product/imprimanta-de-etichete-citizen-e321">
                                        Citizen CL-E321 label printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-termica-citizen-ct-e651" style={{backgroundImage: "url('/images/37316b78-1cd6-4120-96e9-f4d2b20e7f88.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-termica-citizen-ct-e651" />
                                      <meta itemprop="name" content="Citizen CT-E651 thermal printer" />
                                      <a href="/en/product/imprimanta-termica-citizen-ct-e651">
                                        Citizen CT-E651 thermal printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-termica-pos-citizen-ct-e351" style={{backgroundImage: "url('/images/536406e3-f30b-4e9f-bed0-475d1c10de11.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-termica-pos-citizen-ct-e351" />
                                      <meta itemprop="name" content="POS Citizen CT-E651 thermal printer" />
                                      <a href="/en/product/imprimanta-termica-pos-citizen-ct-e351">
                                        POS Citizen CT-E651 thermal printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/imprimanta-portabila-zebra-qln" style={{backgroundImage: "url('/images/f2ea6e75-d599-4909-ba2b-600f7c61c1f7.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/imprimanta-portabila-zebra-qln" />
                                      <meta itemprop="name" content="Zebra QLn Portable Printer" />
                                      <a href="/en/product/imprimanta-portabila-zebra-qln">
                                        Zebra QLn Portable Printer
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
                                          <div className="no-price"></div>
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/rprinter-421-l" style={{backgroundImage: "url('/images/32193b15-01ba-4b44-9089-a4376e101821.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/rprinter-421-l" />
                                      <meta itemprop="name" content="RPrinter 421 L" />
                                      <a href="/en/product/rprinter-421-l">
                                        RPrinter 421 L
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
                                          <div className="no-price"></div>
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
                      <div className="products-view__pagination">
                        <app-pagination>
                          <div className="pagination justify-content-center">
                            <div className="load-more">
                              <div className="load-more-text">
                                 Показать ещё 
                                <span className="arrow-right"></span>
                              </div>
                            </div>
                          </div>
                        </app-pagination>
                      </div>
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
                  <p>
                    <strong>
                      Printers in Moldova for cash receipts, labels, and marking
                    </strong>
                  </p>
                  <p>
                    A receipt printer in Chisinau is an indispensable device for supermarkets, cafes, bars, or restaurants. They are used in various industries and warehouses.
                  </p>
                  <p>
                    This printer is designed to print checks on tape, labels, or forms. One of the most popular is a thermal printer for cash receipts in Moldova. So you get an economical device that does not require additional consumables, such as cartridges or ink. Printing is carried out by heating the print head, which leaves marks on the tape with a special thermal layer.
                  </p>
                  <p>
                    The desktop label printer in Chisinau is designed to be installed in the working area: behind the cash register or on the table. Such printers are connected to a computer using a cable or wi-fi. They can do a lot of work and print hundreds of receipts or labels a day. They are mainly used in stores that have self-service departments for customers. The presence of such devices will help reduce the burden on cash desk workers and speed up the service process.
                  </p>
                  <p>
                    An industrial printer for barcodes in Moldova allows you to print large quantities of markings for goods. As a rule, such printers are equipped with a more durable housing and high performance. Among the presented models, we will help you choose the one that will suit your needs and tasks.
                  </p>
                  <p>
                    A mobile receipt printer in Chisinau is much more modern and convenient to use. Such models are convenient and easy to carry with you at all times. They are very ergonomic, small in size, and comfortable to hold in your hand. You can also fasten it to your belt or even hide it in your pocket. These printers are connected to a computer via Bluetooth and work on battery power.
                  </p>
                  <p>
                    For large businesses, banks, clinics, and other organizations, a printer for badges and passes will become indispensable. In Moldova, many organizations that care about their status and security are equipped with pass systems. Also, such a printer will also help organizations hold various events with a large number of participants. A card printer in Chisinau will allow you to easily and quickly print cards for regular customers.
                  </p>
                  <p>
                    We invite you to choose and buy a production marking printer in Moldova or another type of printer that will help you realize your ideas and improve your business. You can also choose from our catalog laser scanners and data collection terminals.
                  </p>
                  <p>
                    Company RTI - Automation of business processes in Moldova.
                  </p>
                </div>
              </div>
              <div className="extend-button">
                <div className="button">
                  <div>
                     Расширить 
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
