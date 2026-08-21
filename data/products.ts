import type { Product } from '../types/shopping';

/**
 * The product catalogue. Empty, and that is the correct state right now.
 *
 * Nothing goes in here that has not been read off a real listing by a person.
 * There are no Product Advertising API credentials for this site, Amazon's
 * terms do not permit scraping listings for prices, ratings or images, and a
 * catalogue of invented products with invented prices would be worse than an
 * empty one — it would be the single fastest way to lose both the Associates
 * account and the reader.
 *
 * Every shopping page is written to render its empty state cleanly, so the
 * vertical ships and works with zero rows. Adding the first product is a data
 * task, not a code task.
 *
 * To add one, by hand:
 *
 *   1. Create the Special Link in the Amazon Associates dashboard — SiteStripe
 *      on the product page. Do not build the URL yourself; a hand-made `?tag=`
 *      link is not a Special Link.
 *   2. Paste it whole into affiliateUrl. Do not trim or rewrite it.
 *   3. Fill in only what you can see on the listing. Leave price, rating and
 *      reviewCount out entirely if you are not recording them today — the card
 *      renders "Check latest price on Amazon" instead, which is honest and is
 *      also what Amazon's terms expect when you are not showing live data.
 *   4. Set lastUpdated to the date you read it. The card hides the price when
 *      this is missing, because a price with no date is a guess.
 *
 * DEMO products: set source: 'demo'. They are filtered out of every page unless
 * VITE_DEMO_DATA is 'true', so they cannot be mistaken for live listings.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'sony-bravia-2-ii-k-55s25bm2',
    asin: 'B0F7X5FC43',
    name: 'Sony 139 cm (55 inches) BRAVIA 2 II 4K Ultra HD Smart LED Google TV K-55S25BM2',
    brand: 'Sony',
    category: 'smart-tvs',
    subcategory: 'Smart Televisions',

    // Read off the Amazon.in listing on 21 Aug 2026. The date is the point:
    // ProductCard hides the price entirely without it, because a number with no
    // timestamp is a claim about right now that nobody checked.
    price: 63990,
    mrp: 99900,
    currency: 'INR',
    rating: 4.6,
    reviewCount: 1629,
    availability: 'In stock',
    lastUpdated: '2026-08-21',

    keyFeatures: [
      '55-inch 4K Ultra HD LED panel',
      'Google TV, with the Sony BRAVIA 2 II picture processing',
      'Dolby Atmos audio',
    ],
    specifications: [
      { label: 'Screen size', value: '55 inches (139 cm)' },
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Display technology', value: 'LED' },
      { label: 'Operating system', value: 'Google TV' },
      { label: 'Audio', value: 'Dolby Atmos' },
    ],

    /*
      Deliberately not recorded, though all of it was on the page:

        "500+ bought in past month"  — a sales claim, and the brief rules those
                                       out unless verified data supports them.
        "-36%"                       — not stored. ProductCard computes it from
                                       mrp and price, so it cannot drift out of
                                       step with the two numbers it describes.
                                       (99,900 -> 63,990 is 35.9%, shown as 36%.)
        "₹2000 coupon"               — promotional and time-limited. A coupon
                                       that expired last week is worse than no
                                       coupon shown.
        Delivery date                — depends on the reader's pin code, not ours.

      The link below is the SiteStripe Special Link, stored exactly as it was
      generated — linkCode, linkId, ref_ and all sixteen advertising parameters
      it picked up from the click it was created on. None of it is trimmed.
      Amazon's terms are about not modifying a generated link, and "it looked
      untidy" is not a reason to start editing one. resolveAffiliateLink was
      checked against this exact URL and returns it byte-for-byte unchanged.

      Regenerated once. The first version reported to techakki0a-21 — a tracking
      id belonging to a different Associates account — because that was what
      SiteStripe had selected. Nothing about the link looked wrong: it resolved,
      it opened the right product, the button read correctly. It simply would
      have paid someone else. It was replaced by generating a new link with the
      right tracking id, never by editing the tag, and `npm run audit:links`
      exists to catch the next one.
    */
    affiliateUrl:
      'https://www.amazon.in/Sony-inches-BRAVIA-Google-K-55S25BM2/dp/B0F7X5FC43?mcid=0f648b2e35803d5493a0772412f8b8d0&hvadid=709962856271&hvpos=&hvnetw=g&hvrand=17360826101936055839&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9302130&hvtargid=pla-2429324014937&hvocijid=17360826101936055839-B0F7X5FC43-&hvexpln=0&gad_source=1&th=1&linkCode=ll2&tag=aimastertools-21&linkId=f99287fb0c36441d34aaf9326c1cf829&ref_=as_li_ss_tl',
    associateId: 'aimastertools-21',
    trackingId: 'aimastertools-21',

    source: 'manual',
    isActive: true,
    isFeatured: true,
  },

  {
    id: 'apple-macbook-neo-13-a18-pro',
    name: 'Apple 2026 MacBook Neo 13" Laptop with A18 Pro chip, 8GB Unified Memory, 256GB SSD — Indigo',
    brand: 'Apple',
    category: 'laptops',

    // Read off the Amazon.in listing on 21 Aug 2026.
    price: 73990,
    mrp: 79900,
    currency: 'INR',
    rating: 4.8,
    reviewCount: 190,
    availability: 'In stock',
    lastUpdated: '2026-08-21',

    keyFeatures: [
      'A18 Pro chip, described on the listing as built for AI and Apple Intelligence',
      '13-inch Liquid Retina display, 2408x1506, up to 500 nits',
      'Up to 16 hours of battery life',
      '8GB unified memory with 256GB SSD',
    ],
    specifications: [
      { label: 'CPU', value: 'Apple A18 Pro' },
      { label: 'RAM', value: '8 GB unified memory' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Display', value: '13 inches (33.02 cm) Liquid Retina' },
      { label: 'Resolution', value: '2408 x 1506' },
      { label: 'Brightness', value: 'Up to 500 nits' },
      { label: 'Battery life', value: 'Up to 16 hours' },
      { label: 'Camera', value: '1080p FaceTime HD' },
      { label: 'Build', value: 'Aluminium' },
      { label: 'Colour', value: 'Indigo' },
    ],

    /*
      Specifications are transcribed from the listing, not asserted.

      "A18 Pro" in a Mac is worth a note, because A-series silicon has been
      iPhone and iPad hardware and Apple's laptops have used M-series. It is not
      a typo in the title: the listing's own attribute table gives Model Name
      "MacBook Neo" and CPU Model "Apple A18 Pro", and five of the About-this-
      item bullets name the chip. So this records what the listing states, in
      the listing's own words, and asserts nothing beyond it. If the listing is
      wrong then this is wrong in the same way and for the same reason, which is
      the honest failure mode for a catalogue built by reading listings.

      Also on the page but not stored: 512GB is offered as a second size, and
      Silver, Blush and Citrus as other colours. This record is one specific
      configuration — the one the ASIN and the price belong to. A card that
      quotes ₹73,990 beside a spec sheet covering four colours and two storage
      tiers is quoting a price for something the reader cannot buy.

      Left out, all of it on the page:

        "500+ bought in past month"   a sales claim
        "Amazon's Choice"             Amazon's badge, not an editorial judgement
                                      of ours, and repeating it as if it were is
                                      how a directory launders someone else's
                                      ranking as its own
        "-7%"                         computed from mrp and price by the card
                                      (79,900 -> 73,990 is 7.4%, shown as 7%)
        Bank offer, No Cost EMI,      card- and time-specific; an offer that
        cashback                      expired is worse than no offer shown
        Delivery 31 Aug - 2 Sept      depends on the reader's pin code

      The Special Link is stored whole, as generated. This one came from a
      search results page rather than the product page, so it carries the search
      context too — crid, the dib blob, keywords, sr=1-1-spons. None of it is
      trimmed, for the same reason as the Sony: an Amazon-generated link is not
      ours to tidy.
    */
    affiliateUrl:
      'https://www.amazon.in/Apple-2026-MacBook-Laptop-chip/dp/B0GR64G4H6?crid=109PCZS310TRJ&dib=eyJ2IjoiMSJ9.2GeNO-SKFY35P884NewOfdAN3acqBV2cn6tyrT9l6KvjXcYFLuvDkjGjyt9KcmuqQIyGwrrDpILCygSyII5y1OQytSIjnuCpFdy3rt3zjov3AA7n2IJKVvQ9ejm4g75qGrmy9Lt9BIn5JPG3pizesW-j_uIUfFsql02JkqftAe9VVD0US8vSscHGaOBpD1ayKVtAfiGUYC4-XS2EIX-jJst70VQwLSo-VNqm1cOc5lz5cQo7-pavFO1w0qAzWwF9KuGUgWjTZ0WAqQGJbMbpwsDOT2naYPAMm0N_SI2Rlrs.pKRF7OccaFsgxrW8GVxgRcXz4HhTvzJLcWTrexJ9V1s&dib_tag=se&keywords=MACBOOK&qid=1787316171&s=electronics&sprefix=macbook%2Celectronics%2C319&sr=1-1-spons&aref=ROc9vzcamf&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll2&tag=aimastertools-21&linkId=bdd19f28208afb9030cd046091d0fa66&ref_=as_li_ss_tl',
    asin: 'B0GR64G4H6',
    associateId: 'aimastertools-21',
    trackingId: 'aimastertools-21',

    source: 'manual',
    isActive: true,
  },
];

/** Demo rows are only ever shown when explicitly switched on. */
export const DEMO_DATA_ENABLED =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_DEMO_DATA === 'true';

export const ACTIVE_PRODUCTS: Product[] = PRODUCTS.filter(
  (p) => p.isActive !== false && (DEMO_DATA_ENABLED || p.source !== 'demo'),
);

export const PRODUCT_COUNT = ACTIVE_PRODUCTS.length;
