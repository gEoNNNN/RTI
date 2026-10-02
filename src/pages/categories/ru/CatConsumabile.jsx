import React from 'react';
import { Link } from 'react-router-dom';

export default function CatConsumabile() {
  return (
    <div className="site__body">
      <app-product-category>
      <app-product-category>
        <div className="header">
          <app-page-header>
            <div className="page-header product-category bg-image" style={{ backgroundImage: 'url("/images/0882be65-5c09-4250-b11d-20fe92fe733d.jpg")' }}>
              <div className="overlay" style={{ background: 'transparent' }}></div>
              <div id="links" className="page-header__container container">
                <div className="page-header__title">
                  <h1>
                    Расходные материалы
                  </h1>
                </div>
              </div>
            </div>
          </app-page-header>
          <div className="background-gradient">
            <div className="container">
              <div className="subcategories">
                <div className="box-margin">
                  <a className="subCategory-card subCategory-card-all active" href="/ru/category/consumabile">
                    <div className="subCategory-title">
                      Все
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/ru/category/consumabile/etichete-cu-imagine-prealabila">
                    <div className="subCategory-title">
                      Этикетка с предпечатью
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/ru/category/consumabile/etichete-termice">
                    <div className="subCategory-title">
                      Термоэтикетки
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/ru/category/consumabile/hartie-termica">
                    <div className="subCategory-title">
                      Лента кассовая
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/ru/category/consumabile/riboane">
                    <div className="subCategory-title">
                      Риббоны
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
                      <a href="/ru/">
                        Главная
                      </a>
                      <fa-icon size="1" className="ng-fa-icon bc-arrow">
                        <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10 fa-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                        </svg>
                      </fa-icon>
                    </li>
                    <li aria-current="page" className="bc-item active">
                      Расходные материалы
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </app-page-header>
        </div>
        <div className="page full-background">
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
                      <div className="products-view__list products-list">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/ru/product/role-de-hartie-termica-57x40" style={{backgroundImage: "url('/images/bb7de18b-4a47-4dda-8759-4241c99bc134.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,role-de-hartie-termica-57x40" />
                                      <meta itemprop="name" content="Лента кассовая 57x40" />
                                      <a href="/ru/product/role-de-hartie-termica-57x40">
                                        Лента кассовая 57x40
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
                                  <a href="/ru/product/role-de-hartie-termica-59x40" style={{backgroundImage: "url('/images/d01ada75-bd02-44b0-802c-28de3bbca5b5.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,role-de-hartie-termica-59x40" />
                                      <meta itemprop="name" content="Лента кассовая 59x40" />
                                      <a href="/ru/product/role-de-hartie-termica-59x40">
                                        Лента кассовая 59x40
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
                                  <a href="/ru/product/role-de-hartie-termica-8040" style={{backgroundImage: "url('/images/2df1d1f3-5bcc-43c1-b478-a320b5ff1066.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,role-de-hartie-termica-8040" />
                                      <meta itemprop="name" content="Лента кассовая 80x40" />
                                      <a href="/ru/product/role-de-hartie-termica-8040">
                                        Лента кассовая 80x40
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
                                  <a href="/ru/product/eticheta-termica-eco-5860-700pcs" style={{backgroundImage: "url('/images/12fd6495-4ea2-4e8e-bcd4-092fe97ee1b4.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-termica-eco-5860-700pcs" />
                                      <meta itemprop="name" content="Термоэтикетки ЭКО 58x60" />
                                      <a href="/ru/product/eticheta-termica-eco-5860-700pcs">
                                        Термоэтикетки ЭКО 58x60
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
                                  <a href="/ru/product/eticheta-termica-eco-5840700pcs" style={{backgroundImage: "url('/images/ebe8e6df-7628-4950-8f54-a35d6a363015.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-termica-eco-5840700pcs" />
                                      <meta itemprop="name" content="Термоэтикетки ЭКО 58x40" />
                                      <a href="/ru/product/eticheta-termica-eco-5840700pcs">
                                        Термоэтикетки ЭКО 58x40
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
                                  <a href="/ru/product/eticheta-termica-eco-40252000pcs" style={{backgroundImage: "url('/images/6d57cc2d-b130-4996-8489-ace11bd948f7.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-termica-eco-40252000pcs" />
                                      <meta itemprop="name" content="Термоэтикетка ЭКО 40x25" />
                                      <a href="/ru/product/eticheta-termica-eco-40252000pcs">
                                        Термоэтикетка ЭКО 40x25
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
                                  <a href="/ru/product/eticheta-termica-tor-5840700pcs" style={{backgroundImage: "url('/images/346d230e-d6b1-4e3e-a251-86531f7ed74c.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-termica-tor-5840700pcs" />
                                      <meta itemprop="name" content="Термоэтикетки ТОР 58x40" />
                                      <a href="/ru/product/eticheta-termica-tor-5840700pcs">
                                        Термоэтикетки ТОР 58x40
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
                                  <a href="/ru/product/eticheta-de-pret-verde-fluorescenta-fluorescent-green-26121000pcs" style={{backgroundImage: "url('/images/23bc6de6-21a5-4a09-8ea2-f6dc838679c6.png')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-de-pret-verde-fluorescenta-fluorescent-green-26121000pcs" />
                                      <meta itemprop="name" content="Ценники флуоресцентные" />
                                      <a href="/ru/product/eticheta-de-pret-verde-fluorescenta-fluorescent-green-26121000pcs">
                                        Ценники флуоресцентные
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
                                  <a href="/ru/product/eticheta-termica-de-pret-alba-6539550pcs" style={{backgroundImage: "url('/images/113437b9-2d4f-4f88-8fd5-923280bbda56.jpeg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-termica-de-pret-alba-6539550pcs" />
                                      <meta itemprop="name" content="Термоэтикетки 65x39" />
                                      <a href="/ru/product/eticheta-termica-de-pret-alba-6539550pcs">
                                        Термоэтикетки 65x39
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
                                  <a href="/ru/product/eticheta-cu-imagine-prealabila" style={{backgroundImage: "url('/images/d1e907ec-665f-4d6e-8233-f79a7fb34b38.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,eticheta-cu-imagine-prealabila" />
                                      <meta itemprop="name" content="Этикетка с предпечатью" />
                                      <a href="/ru/product/eticheta-cu-imagine-prealabila">
                                        Этикетка с предпечатью
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
                                  <a href="/ru/product/ribbon-cu-transfer-termic-80x300" style={{backgroundImage: "url('/images/ddbbdf8b-e6a2-4d66-b38d-1f45e2abe641.webp')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,ribbon-cu-transfer-termic-80x300" />
                                      <meta itemprop="name" content="Термотрансферный риббон 80x300" />
                                      <a href="/ru/product/ribbon-cu-transfer-termic-80x300">
                                        Термотрансферный риббон 80x300
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
                                  <a href="/ru/product/ribbon-cu-transfer-termic-110x110" style={{backgroundImage: "url('/images/9a25bfe4-7859-49dd-a55b-76b924443d3c.webp')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/ru/product,ribbon-cu-transfer-termic-110x110" />
                                      <meta itemprop="name" content="Термотрансферный риббон 110x110" />
                                      <a href="/ru/product/ribbon-cu-transfer-termic-110x110">
                                        Термотрансферный риббон 110x110
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
                  <h2 className="ql-align-center">
                    Расходные материалы для принтера, печати и маркировки в Молдове
                  </h2>
                  <p></p>
                  <p>
                    Наша компания предоставляет не только лучшее оборудование для автоматизации бизнеса, но также и основные расходные материалы для него. В ассортименте вы можете найти очень многое.
                  </p>
                  <p>
                    Одними из первых являются 
                    <strong>
                      расходные материалы для печати чеков в Кишиневе. 
                    </strong>
                    Чековые ленты используются повсеместно: от крупных магазинов до такси. За каждое проведение платы клиенту обязательно должны выдать чек. Ведь любой возврат или обращение по гарантии может быть осуществлено только при его наличии. Поэтому некоторые владельцы магазинов приобретают и кассовые ленты для этикеток 
                  </p>
                  <p>
                    Для маркировки товаров вам обязательно потребуются 
                    <strong>
                      чековые ленты для штрих-кодов в Молдове. 
                    </strong>
                    Наличие штрих-кода на товарах поможет не только ускорить процесс реализации, но также поможет держать под контролем весь товарооборот и быстро получить необходимую информацию о товаре.
                  </p>
                  <p>
                    Следующими идут 
                    <strong>
                      расходные материалы для принтера этикеток в Кишиневе. 
                    </strong>
                    Подбор материала этикеток зависит от некоторых факторов: типа печатающего устройства, условий хранения продукта или товара и сферы их применения. Но этикетки для печати являются основным расходным материалом, ведь абсолютно каждая единица товара нуждается в маркировке. Самой важной маркировкой для любого продукта является цена и именно у нас вы сможете купить ценники для принтеров.
                  </p>
                  <p>
                    Чтобы выделить товар на фоне остальных можно использовать 
                    <strong>
                      этикетки для цветной печати.
                    </strong>
                     В Молдове,
                    <strong></strong>
                    как и во всем мире, яркие этикетки помогают клиентам ориентироваться в акционных или новых товарах. Для этой же цели рекомендуем купить этикетки с предпечатью, так как они подходят для отдельных категорий продуктов и могут быть выполнены на заказ с вашим дизайном.
                  </p>
                  <p>
                    Именно у нас вы можете найти качественные 
                    <strong>
                      расходные материалы для маркировки в Кишиневе 
                    </strong>
                    для любого оборудования по отличным ценам. У нас есть большой ассортимент термотрансферной ленты, которая незаменима для печати этикеток или чеков, также в ассортименте представлены и сами термоэтикетки для принтеров.
                  </p>
                  <p>
                    Вы можете приобрести 
                    <strong>
                      цветные риббоны для этикеток в Молдове, 
                    </strong>
                    это позволит сделать этикетки яркими и четкими. Высокое качество печати позволяет разместить большой объем информации, который сможет рассказать больше о вашем товаре.
                  </p>
                  <p>
                    Выбрать и
                    <strong>
                       купить расходные материалы для печати штрих-кодов в Кишиневе, 
                    </strong>
                    а также другие запасные элементы от лучших производителей, вы сможет если зайдете на наш сайт! Мы с радостью поможем подобрать вам необходимые комплектующие, которые будут совместимы с вашим оборудованием. Вы также можете выбрать в нашем каталоге ручные слайсеры и контроллеры СКУД.
                  </p>
                  <p>
                    Мы предлагаем вам
                    <span>
                       товары и комплексные решения для автоматизации бизнеса
                    </span>
                    :
                  </p>
                  <ul>
                    <li>
                      <a href="https://rti.md/ru/category/echipamente-fiscale" target="_blank">
                        Фискальное оборудование
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/category/pospc-specializat" target="_blank">
                        POS оборудование
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/category/scanere-coduri-de-bare" target="_blank">
                        Сканеры штрих-кодов
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/category/cantare-comerciale" target="_blank">
                        Торговые весы
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/category/imprimante" target="_blank">
                        Принтеры
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/solutii-automatizare-horeca" target="_blank">
                        Автоматизация HoReCa
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/automatizare-retail" target="_blank">
                        Автоматизация розничной торговли
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/supraveghere-video" target="_blank">
                        Системы видеонаблюдения
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/sisteme-de-parcare" target="_blank">
                        Парковочные системы
                      </a>
                    </li>
                    <li>
                      <a href="https://rti.md/ru/panouri-digitale" target="_blank">
                        Цифровые вывески
                      </a>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p className="ql-align-center">
                    Компания RTI - 
                    <a href="https://rti.md/ru" target="_blank">
                      Автоматизация бизнес процессов в Молдове
                    </a>
                    !
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
