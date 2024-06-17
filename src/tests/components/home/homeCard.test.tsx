import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HomeCard } from '../../../components/home/homeCard/HomeCard';

import type { ProductProjection } from '@commercetools/platform-sdk';


describe('HomeCard component', () => {
  const mockProduct: ProductProjection = {
    id: '863089c2-f1c6-442d-8562-028e832feb9d',
    version: 27,
    productType: {
      typeId: 'product-type',
      id: '383a7622-d319-4b24-bd20-3c359ca0d139',
    },
    name: {
      en: 'Pillars of Creation Photo Print',
    },
    description: {
      en: "Bring the awe-inspiring beauty of the cosmos into your space with our Pillars of Creation Photo Print. Captured by NASA's Hubble Space Telescope, this high-quality print showcases the iconic interstellar gas and dust formations in stunning detail. Perfect for astronomy enthusiasts and art lovers alike, this piece will add a touch of the universe's mystique to any room.",
    },
    categories: [
      {
        typeId: 'category',
        id: '7ee05e1d-af05-4304-ac89-9b4d9c995773',
      },
    ],
    categoryOrderHints: {},
    slug: {
      en: 'pillars-of-creation-photo-print',
    },
    metaTitle: {
      en: 'Pillars of Creation Photo Print',
    },
    metaDescription: {
      en: 'Bring the awe-inspiring beauty of the Pillars of Creation into your space with this stunning NASA photo print.',
    },
    variants: [],
    masterVariant: {
      attributes: [
        {
          name: 'bestseller',
          value: [true],
        },
        {
          name: 'material',
          value: {
            key: 'canvas',
            label: {
              en: 'Canvas',
            },
          },
        },
        {
          name: 'discount',
          value: [
            {
              key: '15%-off',
              label: '15% OFF',
            },
          ],
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://images.cdn.europe-west1.gcp.commercetools.com/08808710-2ce2-4208-ad93-655dde122ee6/06-s9f8t1lP.jpg',
          dimensions: {
            w: 800,
            h: 800,
          },
        },
        {
          url: 'https://images.cdn.europe-west1.gcp.commercetools.com/08808710-2ce2-4208-ad93-655dde122ee6/01--BFYj5rc.jpg',
          dimensions: {
            w: 800,
            h: 800,
          },
        },
        {
          url: 'https://images.cdn.europe-west1.gcp.commercetools.com/08808710-2ce2-4208-ad93-655dde122ee6/03-nJyHCEPJ.jpg',
          dimensions: {
            w: 800,
            h: 800,
          },
        },
        {
          url: 'https://images.cdn.europe-west1.gcp.commercetools.com/08808710-2ce2-4208-ad93-655dde122ee6/04-GJJd_hHP.jpg',
          dimensions: {
            w: 800,
            h: 800,
          },
        },
        {
          url: 'https://images.cdn.europe-west1.gcp.commercetools.com/08808710-2ce2-4208-ad93-655dde122ee6/05-Q_4cyY2-.jpg',
          dimensions: {
            w: 800,
            h: 800,
          },
        },
        {
          url: 'https://images.cdn.europe-west1.gcp.commercetools.com/08808710-2ce2-4208-ad93-655dde122ee6/02-dkp8iNhr.jpg',
          dimensions: {
            w: 800,
            h: 800,
          },
        },
      ],
      prices: [
        {
          id: '4efeec81-0350-48a3-b22b-b374c0fd72c1',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 8500,
            fractionDigits: 2,
          },
          key: 'photo-price-1',
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 7225,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: 'd1933ba4-32a0-421a-acb5-9ef54ecfa323',
            },
          },
        },
      ],
      key: 'space-photo-1',
      sku: '0040',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    key: 'pillars-of-creation-photo-print',
    taxCategory: {
      typeId: 'tax-category',
      id: '285210ac-4515-4e2a-976d-81a19156591f',
    },
    priceMode: 'Embedded',
    createdAt: '2024-06-01T15:33:51.104Z',
    lastModifiedAt: '2024-06-08T18:50:18.881Z',
  };

  it('renders HomeCard component with basic structure', () => {
    render(
      <MemoryRouter>
        <HomeCard dataCard={mockProduct} isVertical={false} />
      </MemoryRouter>,
    );
    const cardTitle = screen.getByText('Pillars of Creation Photo Print');
    expect(cardTitle).toBeInTheDocument();
  });
});
