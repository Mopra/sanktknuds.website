import { defineCollection, defineConfig, s } from 'velite';

const localeEnum = s.enum(['da', 'en']);

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/*.md',
  schema: s
    .object({
      slug: s.string(),
      locale: localeEnum,
      title: s.string(),
      seoTitle: s.string().optional(),
      description: s.string().optional(),
      eyebrow: s.string().optional(),
      body: s.markdown(),
      metadata: s.metadata(),
    })
    .transform((data) => ({
      ...data,
      id: `${data.slug}.${data.locale}`,
    })),
});

const menuSections = defineCollection({
  name: 'MenuSection',
  pattern: 'menu/*.md',
  schema: s
    .object({
      slug: s.string(),
      locale: localeEnum,
      title: s.string(),
      description: s.string().optional(),
      items: s.array(
        s.object({
          name: s.string(),
          description: s.string().optional(),
          price: s.number().optional(),
          tags: s.array(s.string()).optional(),
        }),
      ),
    })
    .transform((data) => ({
      ...data,
      id: `${data.slug}.${data.locale}`,
    })),
});

const tastings = defineCollection({
  name: 'Tasting',
  pattern: 'tastings/*.md',
  schema: s
    .object({
      slug: s.string(),
      locale: localeEnum,
      eyebrow: s.string().optional(),
      title: s.string(),
      description: s.string().optional(),
      note: s.string().optional(),
      groups: s.array(
        s.object({
          name: s.string(),
          items: s.array(s.string()).default([]),
        }),
      ),
    })
    .transform((data) => ({
      ...data,
      id: `${data.slug}.${data.locale}`,
    })),
});

const receptions = defineCollection({
  name: 'Reception',
  pattern: 'reception/*.md',
  schema: s
    .object({
      slug: s.string(),
      locale: localeEnum,
      eyebrow: s.string().optional(),
      title: s.string(),
      description: s.string().optional(),
      dateLabel: s.string(),
      timeLabel: s.string(),
      startDate: s.string(),
      endDate: s.string(),
      closing: s.string().optional(),
      body: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      id: `${data.slug}.${data.locale}`,
    })),
});

const localized = s.object({ da: s.string(), en: s.string() });

const wineCard = defineCollection({
  name: 'WineCard',
  pattern: 'wine/card.md',
  single: true,
  schema: s.object({
    sections: s.array(
      s.object({
        id: s.string(),
        label: localized,
        note: localized.optional(),
        groups: s.array(
          s.object({
            label: localized.optional(),
            wines: s.array(
              s.object({
                name: s.string(),
                glass: s.number().optional(),
                bottle: s.number().optional(),
                limited: s.boolean().default(false),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
});

const site = defineCollection({
  name: 'Site',
  pattern: 'settings/site.md',
  single: true,
  schema: s.object({
    name: s.string(),
    foundedYear: s.number(),
    address: s.object({
      streetAddress: s.string(),
      addressDetail: s.string().optional(),
      locality: s.string(),
      postalCode: s.string(),
      country: s.string(),
      region: s.string().optional(),
    }),
    cvr: s.string().optional(),
    geo: s
      .object({
        latitude: s.number(),
        longitude: s.number(),
      })
      .optional(),
    phone: s.string(),
    email: s.string().email(),
    bookingUrl: s.string().url(),
    social: s.object({
      instagram: s.string().url().optional(),
      facebook: s.string().url().optional(),
    }),
    tagline: s.object({
      da: s.string(),
      en: s.string(),
    }),
    currentPour: s
      .object({
        da: s.string(),
        en: s.string(),
      })
      .optional(),
    preLaunch: s.boolean().default(false),
    openingMonth: s
      .object({
        da: s.string(),
        en: s.string(),
      })
      .optional(),
  }),
});

const hours = defineCollection({
  name: 'Hours',
  pattern: 'settings/hours.md',
  single: true,
  schema: s.object({
    services: s.array(
      s.object({
        name: s.object({
          da: s.string(),
          en: s.string(),
        }),
        schedule: s.array(
          s.object({
            days: s.array(s.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])),
            ranges: s.array(
              s.object({
                opens: s.string(),
                closes: s.string(),
              }),
            ),
          }),
        ),
      }),
    ),
    notes: s
      .object({
        da: s.string(),
        en: s.string(),
      })
      .optional(),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: { pages, menuSections, tastings, receptions, wineCard, site, hours },
});
