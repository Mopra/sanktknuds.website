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

const site = defineCollection({
  name: 'Site',
  pattern: 'settings/site.md',
  single: true,
  schema: s.object({
    name: s.string(),
    foundedYear: s.number(),
    address: s.object({
      streetAddress: s.string(),
      locality: s.string(),
      postalCode: s.string(),
      country: s.string(),
      region: s.string().optional(),
    }),
    geo: s
      .object({
        latitude: s.number(),
        longitude: s.number(),
      })
      .optional(),
    phone: s.string(),
    email: s.string().email(),
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
  }),
});

const hours = defineCollection({
  name: 'Hours',
  pattern: 'settings/hours.md',
  single: true,
  schema: s.object({
    schedule: s.array(
      s.object({
        days: s.array(s.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])),
        opens: s.string(),
        closes: s.string(),
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
  collections: { pages, menuSections, site, hours },
});
