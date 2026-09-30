import React from 'react';
import { Link } from 'react-router-dom';

export default function CatEchipamenteDeParcare() {
  return (
    <div className="site__body">
      <app-product-category>
      <app-product-category>
        <div className="header">
          <app-page-header>
            <div className="page-header product-category bg-image" style={{ backgroundImage: 'url("https://cdn.rti.md//resize:fill:1980/q:80/plain/local:///public/product-categories/thumbnail/775be61a-f81e-4f89-a90e-951c67295e2f.png")' }}>
              <div className="overlay" style={{ background: 'transparent' }}></div>
              <div id="links" className="page-header__container container">
                <div className="page-header__title">
                  <h1>
                    Parking equipment
                  </h1>
                </div>
              </div>
            </div>
          </app-page-header>
          <div className="background-gradient">
            <div className="container">
              <div className="subcategories">
                <div className="box-margin">
                  <a className="subCategory-card subCategory-card-all active" href="/en/category/echipamente-de-parcare">
                    <div className="subCategory-title">
                      Все
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/echipamente-de-parcare/ticket-system">
                    <div className="subCategory-title">
                      Ticket System
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/echipamente-de-parcare/cardpass-rparking">
                    <div className="subCategory-title">
                      CardPass RParking
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/echipamente-de-parcare/terminal-de-plata">
                    <div className="subCategory-title">
                      Payment Terminal
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/echipamente-de-parcare/bariera-automata">
                    <div className="subCategory-title">
                      Automatic Barrier
                    </div>
                  </a>
                </div>
                <div className="box-margin">
                  <a routerlinkactive="active" className="subCategory-card" href="/en/category/echipamente-de-parcare/accesorii-de-parcare">
                    <div className="subCategory-title">
                      Parking Accessories
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
                      Parking equipment
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
                                  <a href="/en/product/bariere">
                                    <img src="/images/b22edda6-6536-4a86-ba8e-b0f2b5c38b05.png" alt="Automatic Barrier RParking" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/bariere" />
                                      <meta itemprop="name" content="Automatic Barrier RParking" />
                                      <a href="/en/product/bariere">
                                        Automatic Barrier RParking
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
                                  <a href="/en/product/terminal-de-intrare">
                                    <img src="/images/e88c868c-3455-42dd-9b27-8c64b28df132.png" alt="Entry terminal Ticket System" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/terminal-de-intrare" />
                                      <meta itemprop="name" content="Entry terminal Ticket System" />
                                      <a href="/en/product/terminal-de-intrare">
                                        Entry terminal Ticket System
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
                                  <a href="/en/product/terminal-de-plata-automata">
                                    <img src="/images/2ae38ef6-a292-45f6-8083-20696600e018.png" alt="Automatic payment terminal" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/terminal-de-plata-automata" />
                                      <meta itemprop="name" content="Automatic payment terminal" />
                                      <a href="/en/product/terminal-de-plata-automata">
                                        Automatic payment terminal
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
                                  <a href="/en/product/terminal-de-intrare-cardpass-rparking">
                                    <img src="/images/8bd092e8-b035-48e9-ad2c-f46bd226c567.png" alt="CardPass RParking Entry Terminal" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/terminal-de-intrare-cardpass-rparking" />
                                      <meta itemprop="name" content="CardPass RParking Entry Terminal" />
                                      <a href="/en/product/terminal-de-intrare-cardpass-rparking">
                                        CardPass RParking Entry Terminal
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
                                  <a href="/en/product/terminal-de-iesire-cardpass-rparking">
                                    <img src="/images/ae8fa814-897e-48e0-821a-7ec3894f913b.png" alt="CardPass RParking Exit Terminal" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/terminal-de-iesire-cardpass-rparking" />
                                      <meta itemprop="name" content="CardPass RParking Exit Terminal" />
                                      <a href="/en/product/terminal-de-iesire-cardpass-rparking">
                                        CardPass RParking Exit Terminal
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
                                  <a href="/en/product/terminal-de-iesire-ticket-system">
                                    <img src="/images/a6d1a89d-3c44-4d98-a5dc-2f6c29bfc39b.png" alt="Ticket System Exit Terminal" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/terminal-de-iesire-ticket-system" />
                                      <meta itemprop="name" content="Ticket System Exit Terminal" />
                                      <a href="/en/product/terminal-de-iesire-ticket-system">
                                        Ticket System Exit Terminal
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
                                  <a href="/en/product/terminal-de-plata-generatia-2">
                                    <img src="/images/017fcb38-b3d4-4533-9820-09e944dbc7e3.png" alt="Generation 2 Payment Terminal" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/terminal-de-plata-generatia-2" />
                                      <meta itemprop="name" content="Generation 2 Payment Terminal" />
                                      <a href="/en/product/terminal-de-plata-generatia-2">
                                        Generation 2 Payment Terminal
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
                                  <a href="/en/product/blocator-de-parcare-inteligent-pshare-n01ru">
                                    <img src="/images/e0c3a866-bfe3-4a30-96c3-2d11be5ddbc3.png" alt="Smart Parking Lock - Rparking Lock" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/blocator-de-parcare-inteligent-pshare-n01ru" />
                                      <meta itemprop="name" content="Smart Parking Lock - Rparking Lock" />
                                      <a href="/en/product/blocator-de-parcare-inteligent-pshare-n01ru">
                                        Smart Parking Lock - Rparking Lock
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
                                               Сделать предзаказ в один   
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-3">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/detachers-universal">
                                    <img src="/images/0d0c9a93-e741-4b34-b354-ad2ee782b7f6.png" alt="Automatic barrier RParking PRO" loading="lazy" />
                                  </a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/detachers-universal" />
                                      <meta itemprop="name" content="Automatic barrier RParking PRO" />
                                      <a href="/en/product/detachers-universal">
                                        Automatic barrier RParking PRO
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
      </app-product-category>
      </app-product-category>
    </div>
  );
}
