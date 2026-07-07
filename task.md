# Backend & Cart Integration Task List

- [x] Set up Express backend inside `Ecom_BE`
  - [x] Initialize project and install dependencies (`express`, `mongoose`, `cors`, `dotenv`)
  - [x] Create `.env` file with MongoDB connection string
  - [x] Create Cart Mongoose model (`models/cartModel.js`)
  - [x] Create Cart Express routes (`routes/cartRoutes.js`)
  - [x] Create main server file (`server.js`)
- [x] Implement Front-End Cart Service & Context inside `Ecom_FE`
  - [x] Create API service (`src/services/cartService.js`)
  - [x] Create Cart Context Provider (`src/context/CartContext.jsx`)
  - [x] Register new `/cart` route and wrap app in `CartProvider` in `App.jsx`
- [x] Update Navbar with Cart Badge
  - [x] Import Cart Context in `HomeNavbar.jsx`
  - [x] Add item count badge to Cart trolley icon and make it link to `/cart`
- [x] Build Premium Cart Page
  - [x] Create `CartPage.jsx` with lists, details, quantity adjustments, checkout simulation, and empty state
- [x] Connect "Add to Cart" Buttons
  - [x] `ProductGrid.jsx`
  - [x] `ProductListView.jsx`
  - [x] `TrendingArtworks.jsx`
  - [x] `FlashSaleDeals.jsx`
  - [x] `ProductDetailModal.jsx`
- [x] Verification and Testing
  - [x] Launch backend and frontend
  - [ ] Validate full integration (add, update, delete, retrieve, checkout)

# Tasks

- [x] 1. Install `gsap` dependency
- [x] 2. Modify `ProductDetailModal.jsx` to render direct `product.img`
- [x] 3. Update `ProductGrid.jsx` and `ProductListView.jsx` to pass the correct `img` reference
- [x] 4. Update `FlashSaleDeals.jsx` to show Deal of Month as a responsive, animated popup box with a running countdown timer, and add GSAP scroll transitions
- [x] 5. Center `ShopByCategory.jsx` cards and add right side padding
- [x] 6. Update `TrendingArtworks.jsx`, `FeaturedGalleries.jsx`, and `LimitedEdition.jsx` with GSAP animations
- [x] 7. Align TrendingArtworks cards design to match the layout image (4 cards, top edge-to-edge images, custom padding, black stars, and sharp Add to Cart button).
- [x] 8. Bind HeroCarousel CTA buttons to smooth-scroll to paintings-section and add GSAP scale hover/touch animations.
- [x] 9. Render a floating Back to Top arrow option that dynamically stays above the Deal of Month popup or the minimized badge.
- [x] 10. Map smooth scrolling targets: DRAWINGS targets Flash Sale (`drawings-section`), SCULPTURE targets Trending Artworks (`sculpture-section`), and ARTISTS targets Limited Edition (`artists-section`).
- [x] 11. Fix the image display issue in the HeroCarousel by correcting the `₹` typo to a `$` string interpolation token in the backgroundImage URL.
- [x] 12. Extract the floating Back to Top button and the expandable Deal of the Month popup countdown timer into a new shared component `FloatingActions.jsx`.
- [x] 13. Clean up the duplicate floating logic from `FlashSaleDeals.jsx` and render `<FloatingActions />` on `HomePage.jsx`, `ProductsPage.jsx`, and `ProductsListPage.jsx`.
- [x] 14. Add GSAP fade-in/slide reveals on load for the category filter sidebar, product grid card list, and product list rows on the product page.
- [x] 15. Build and verify the application
