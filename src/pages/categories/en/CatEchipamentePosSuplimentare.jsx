import React from 'react';
import { Link } from 'react-router-dom';

export default function CatEchipamentePosSuplimentare() {
  return (
    <div className="site__body">
      <app-product-category>
      <app-product-category>
        <div className="header">
          <app-page-header>
            <div className="page-header product-category bg-image" style={{ backgroundImage: 'url("/images/default-bg-category.b1c93.png")' }}>
              <div className="overlay" style={{ background: 'transparent' }}></div>
              <div id="links" className="page-header__container container">
                <div className="page-header__title">
                  <h1>
                    Additional POS equipment
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
                      Additional POS equipment
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
              <div className="shop-layout__sidebar">
                <app-shop-sidebar offcanvas="mobile">
                  <div className="block block-sidebar block-sidebar--offcanvas--mobile">
                    <div className="block-sidebar__backdrop"></div>
                    <div className="block-sidebar__body">
                      <div className="block-sidebar__header">
                        <div className="block-sidebar__title">
                          Фильтры
                        </div>
                        <button type="button" className="block-sidebar__close">
                          <fa-icon size="lg" className="ng-fa-icon">
                            <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 fa-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                              <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                            </svg>
                          </fa-icon>
                        </button>
                      </div>
                      <div className="block-sidebar__item">
                        <product-filters>
                          <div className="widget-filters widget widget-filters--offcanvas--mobile">
                            <h4 className="widget-filters__title widget__title">
                              Фильтры
                            </h4>
                            <div className="widget-filters__list">
                              <price-filter>
                                <filter-container>
                                  <div className="widget-filters__item">
                                    <div className="filter filter--opened">
                                      <button type="button" className="filter__title">
                                         Price 
                                        <fa-icon className="ng-fa-icon filter__arrow">
                                          <svg role="img" ariaHidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                                          </svg>
                                        </fa-icon>
                                      </button>
                                      <div appcollapsecontent="" className="filter__body">
                                        <div className="filter__container">
                                          <div className="filter-price">
                                            <div className="filter-price__slider">
                                              <div className="ngx-slider-custom">
                                                <ngx-slider className="ngx-slider" ariaLabel="ngx-slider">
                                                  <span ngxsliderelement="" className="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-left-out-selection" style={{ opacity: '1', visibility: 'hidden', transform: 'rotate(0deg)' }}>
                                                    <span className="ngx-slider-span ngx-slider-bar"></span>
                                                  </span>
                                                  <span ngxsliderelement="" className="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-right-out-selection" style={{ opacity: '1', visibility: 'hidden', transform: 'rotate(0deg)' }}>
                                                    <span className="ngx-slider-span ngx-slider-bar"></span>
                                                  </span>
                                                  <span ngxsliderelement="" className="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-full-bar" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}>
                                                    <span className="ngx-slider-span ngx-slider-bar"></span>
                                                  </span>
                                                  <span ngxsliderelement="" className="ngx-slider-span ngx-slider-bar-wrapper ngx-slider-selection-bar" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}>
                                                    <span className="ngx-slider-span ngx-slider-bar ngx-slider-selection"></span>
                                                  </span>
                                                  <span ngxsliderhandle="" className="ngx-slider-span ngx-slider-pointer ngx-slider-pointer-min" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }} role="" tabIndex="" aria-orientation="" ariaLabel="" aria-labelledby="" aria-valuenow="" aria-valuetext="" aria-valuemin="" aria-valuemax=""></span>
                                                  <span ngxsliderhandle="" className="ngx-slider-span ngx-slider-pointer ngx-slider-pointer-max" style={{ display: 'inherit', opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }} role="" tabIndex="" aria-orientation="" ariaLabel="" aria-labelledby="" aria-valuenow="" aria-valuetext="" aria-valuemin="" aria-valuemax=""></span>
                                                  <span ngxsliderlabel="" className="ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-floor" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}></span>
                                                  <span ngxsliderlabel="" className="ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-ceil" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}></span>
                                                  <span ngxsliderlabel="" className="ngx-slider-span ngx-slider-bubble ngx-slider-model-value" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}></span>
                                                  <span ngxsliderlabel="" className="ngx-slider-span ngx-slider-bubble ngx-slider-model-high" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}></span>
                                                  <span ngxsliderlabel="" className="ngx-slider-span ngx-slider-bubble ngx-slider-combined" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}></span>
                                                  <span ngxsliderelement="" className="ngx-slider-ticks" hidden="" style={{ opacity: '1', visibility: 'visible', transform: 'rotate(0deg)' }}></span>
                                                </ngx-slider>
                                              </div>
                                            </div>
                                            <div className="filter-price__title">
                                               Price: 
                                              <span className="filter-price__min-value">
                                                0,00 L
                                              </span>
                                               – 
                                              <span className="filter-price__max-value">
                                                0,00 L
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </filter-container>
                              </price-filter>
                            </div>
                            <div className="widget-filters__actions d-flex">
                              <button type="button" className="btn btn-secondary btn-sm ml-2">
                                Сброс
                              </button>
                            </div>
                          </div>
                        </product-filters>
                      </div>
                    </div>
                  </div>
                </app-shop-sidebar>
              </div>
              <div className="shop-layout__content full-width">
                <div className="block">
                  <products-view offcanvas="mobile">
                    <div className="products-view">
                      <div className="products-view__list products-list">
                        <div className="row">
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-4">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/monitor-pentru-clienti-fec" style={{backgroundImage: "url('/images/3c3dc223-85a2-4836-ae58-1289d584e6f6.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/monitor-pentru-clienti-fec" />
                                      <meta itemprop="name" content="FEC AM-1008W POS customer display" />
                                      <a href="/en/product/monitor-pentru-clienti-fec">
                                        FEC AM-1008W POS customer display
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-4">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/sertar-de-bani-hs-410a" style={{backgroundImage: "url('/images/d8470884-9571-4160-ac7d-f261dbe26604.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/sertar-de-bani-hs-410a" />
                                      <meta itemprop="name" content="Money drawer HS-410A" />
                                      <a href="/en/product/sertar-de-bani-hs-410a">
                                        Money drawer HS-410A
                                      </a>
                                    </div>
                                  </div>
                                  <div className="product-card-footer">
                                    <div className="left">
                                      <meta itemprop="price" content="" />
                                      <meta itemprop="priceCurrency" content="" />
                                      <meta itemprop="sku" content="1211" />
                                      <product-price-view>
                                        <div className="priceBox small">
                                          <div className="no-price">
                                            <div className="text">
                                               Сделать предзаказ в один{' '}
                                              <span>
                                                клик
                                              </span>
                                            </div>
                                            <div className="text">
                                              1211
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
                          <div className="col-md-4 col-sm-6 pb-30 col-lg-4">
                            <app-product-card>
                              <div className="product-card">
                                <div itemscope="" className="product-card__image">
                                  <a href="/en/product/sertar-de-bani-hs-170" style={{backgroundImage: "url('/images/c0bd21f0-3c69-4b18-b6a7-080a6e1eedf0.jpg')"}}></a>
                                </div>
                                <div className="product-card-box-meta">
                                  <div itemscope="" className="product-name">
                                    <div className="product-card__name">
                                      <link itemprop="url" href="/en/product/sertar-de-bani-hs-170" />
                                      <meta itemprop="name" content="HS-170 cash drawer " />
                                      <a href="/en/product/sertar-de-bani-hs-170">
                                        HS-170 cash drawer 
                                      </a>
                                    </div>
                                  </div>
                                  <div className="product-card-footer">
                                    <div className="left">
                                      <meta itemprop="price" content="0" />
                                      <meta itemprop="priceCurrency" content="" />
                                      <meta itemprop="sku" content="24524" />
                                      <product-price-view>
                                        <div className="priceBox small">
                                          <div className="no-price">
                                            <div className="text">
                                               Сделать предзаказ в один{' '}
                                              <span>
                                                клик
                                              </span>
                                            </div>
                                            <div className="text">
                                              24524
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
                  <p>
                    RTI has more than a decade of experience offering complete POS Hardware and additional solutions to our retail and hospitality customers. Whether you need to set up a complete POS system from scratch or you need to add peripherals and software to your basic system, we can help you find the right equipment.
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
