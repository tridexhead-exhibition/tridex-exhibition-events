import tataHitachiImg from '../../assets/images/tata_hitachi.jpeg';
import portfolio2Img from '../../assets/images/portfolio_2.jpeg';
import portfolio3Img from '../../assets/images/portfolio_3.jpeg';

import whatsapp1 from '../../assets/images/whatsapp_1.jpeg';
import whatsapp2 from '../../assets/images/whatsapp_2.jpeg';
import whatsapp3 from '../../assets/images/whatsapp_3.jpeg';
import whatsapp4 from '../../assets/images/whatsapp_4.jpeg';
import whatsapp5 from '../../assets/images/whatsapp_5.jpeg';
import whatsapp6 from '../../assets/images/whatsapp_6.jpeg';
import whatsapp7 from '../../assets/images/whatsapp_7.jpeg';
import whatsapp8 from '../../assets/images/whatsapp_8.jpeg';
import whatsapp9 from '../../assets/images/whatsapp_9.jpeg';
import whatsapp10 from '../../assets/images/whatsapp_10.jpeg';
import whatsapp13 from '../../assets/images/whatsapp_13.jpeg';
import whatsapp14 from '../../assets/images/whatsapp_14.jpeg';
import whatsapp15 from '../../assets/images/whatsapp_15.jpeg';
import whatsapp16 from '../../assets/images/whatsapp_16.jpeg';
import whatsapp19 from '../../assets/images/whatsapp_19.jpeg';
import whatsapp20 from '../../assets/images/whatsapp_20.jpeg';
import whatsapp21 from '../../assets/images/whatsapp_21.jpeg';
import whatsapp22 from '../../assets/images/whatsapp_22.jpeg';
import whatsapp24 from '../../assets/images/whatsapp_24.jpeg';
import whatsapp29 from '../../assets/images/whatsapp_29.jpeg';

import './PortfolioGrid.css';

const PORTFOLIO_ITEMS = [
  {
    image: tataHitachiImg,
    title: 'Baker Hughes Exhibition Stall',
    category: 'Energy & Technology'
  },
  {
    image: portfolio2Img,
    title: 'BYD Auto Expo Pavilion',
    category: 'Automotive & EV'
  },
  {
    image: portfolio3Img,
    title: 'Sky Textiles Exhibition Stall',
    category: 'Textiles & Apparel'
  },
  {
    image: whatsapp1,
    title: 'Java Juice Mall Kiosk',
    category: 'Retail & F&B'
  },
  {
    image: whatsapp2,
    title: 'Reserva Apparel Display',
    category: 'Fashion & Retail'
  },
  {
    image: whatsapp3,
    title: 'Meliá Hotels Design Pavilion',
    category: 'Hospitality & Leisure'
  },
  {
    image: whatsapp4,
    title: 'Volkswagen ID. Expo Pavilion',
    category: 'Automotive & EV'
  },
  {
    image: whatsapp5,
    title: 'Gran Canaria Tourism Pavilion',
    category: 'Travel & Tourism'
  },
  {
    image: whatsapp6,
    title: 'Tridex Sustainable Expo Stall',
    category: 'Eco-Friendly Designs'
  },
  {
    image: whatsapp7,
    title: 'Mercedes-Benz S-Class Lounge',
    category: 'Automotive & EV'
  },
  {
    image: whatsapp8,
    title: 'Coco Loco Juice & Dessert Bar',
    category: 'Retail & F&B'
  },
  {
    image: whatsapp9,
    title: 'Armandoz Tea Kiosk',
    category: 'Retail & F&B'
  },
  {
    image: whatsapp10,
    title: 'b.a.g. India Exhibition Stall',
    category: 'Electronics & Lighting'
  },
  {
    image: whatsapp13,
    title: 'TYF LED Lighting Exhibition Booth',
    category: 'Electronics & Lighting'
  },
  {
    image: whatsapp14,
    title: 'dlg Group Wooden Pavilion',
    category: 'Eco-Friendly Designs'
  },
  {
    image: whatsapp15,
    title: 'Xtreme Media Display Stall',
    category: 'Digital Displays & Media'
  },
  {
    image: whatsapp16,
    title: 'OSB Sustainable Packing Pavilion',
    category: 'Eco-Friendly Designs'
  },
  {
    image: whatsapp19,
    title: 'EcoStan Machineries 3D Render',
    category: 'Industrial Machinery'
  },
  {
    image: whatsapp20,
    title: 'Ajanta Board Design Pavilion',
    category: 'Building Materials'
  },
  {
    image: whatsapp21,
    title: 'Nordstan Plywood Installation',
    category: 'Interior & Decor'
  },
  {
    image: whatsapp22,
    title: 'ASOT Solar Solutions Stall',
    category: 'Renewable Energy'
  },
  {
    image: whatsapp24,
    title: 'Global Tech Machinery Pavilion',
    category: 'Industrial Machinery'
  },
  {
    image: whatsapp29,
    title: 'Shilpa Medicare Pharma Stall',
    category: 'Healthcare & Pharma'
  }
];

function PortfolioGrid() {
  return (
    <section className="portfolio-grid-section" aria-label="Our Work">
      <div className="container container--wide portfolio-grid-container">
        {/* Header */}
        <div className="portfolio-grid-header">
          <span className="portfolio-grid-subtitle">Our Work</span>
          <h2 className="portfolio-grid-title">
            Our Global Exhibition Booth Design Work <span className="portfolio-grid-accent">Across Industries</span>
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="portfolio-grid-layout">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <div className="portfolio-card" key={`${item.title}-${idx}`}>
              <div className="portfolio-card__image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="portfolio-card__image"
                  loading="lazy"
                />
                
                {/* Full-card Absolute Text Overlay */}
                <div className="portfolio-card__overlay">
                  <div className="portfolio-card__content">
                    <span className="portfolio-card__category">{item.category}</span>
                    <h3 className="portfolio-card__title">{item.title}</h3>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioGrid;
