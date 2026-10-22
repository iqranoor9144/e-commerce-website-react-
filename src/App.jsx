
import { useMemo, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Classic Everyday Bag',
    category: 'Accessories',
    price: 2499,
    oldPrice: 3200,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80',
    tag: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'Minimal White Sneakers',
    category: 'Shoes',
    price: 3499,
    oldPrice: 4200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    tag: 'POPULAR',
  },
  {
    id: 3,
    name: 'Elegant Summer Outfit',
    category: 'Clothing',
    price: 2899,
    oldPrice: 3600,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80',
    tag: 'NEW',
  },
  {
    id: 4,
    name: 'Timeless Wrist Watch',
    category: 'Accessories',
    price: 1999,
    oldPrice: 2600,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    tag: 'SALE',
  },
  {
    id: 5,
    name: 'Premium Casual Shirt',
    category: 'Clothing',
    price: 1799,
    oldPrice: 2300,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80',
    tag: 'POPULAR',
  },
  {
    id: 6,
    name: 'Everyday Shoulder Bag',
    category: 'Accessories',
    price: 2199,
    oldPrice: 2800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',
    tag: 'NEW',
  },
  {
    id: 7,
    name: 'Modern Running Shoes',
    category: 'Shoes',
    price: 3999,
    oldPrice: 4800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    tag: 'BESTSELLER',
  },
  {
    id: 8,
    name: 'Chic Everyday Dress',
    category: 'Clothing',
    price: 3299,
    oldPrice: 4100,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
    tag: 'SALE',
  },
]

const categories = ['All', 'Clothing', 'Shoes', 'Accessories']

const money = (amount) =>
  `Rs. ${amount.toLocaleString('en-PK')}`

function App() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())

      return matchesCategory && matchesSearch
    })

    if (sort === 'low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sort === 'high') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [category, search, sort])

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...previousCart, { ...product, quantity: 1 }]
    })

    setNotice(`${product.name} added to cart!`)
    setTimeout(() => setNotice(''), 2500)
  }

  function updateQuantity(id, change) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    )
  }

  function handleCheckout() {
    if (cart.length === 0) return

    setNotice('Demo checkout! Payment gateway is not connected.')
    setCartOpen(false)
    setTimeout(() => setNotice(''), 3500)
  }

  return (
    <div className="min-h-screen">
      {/* Announcement bar */}
      <div className="bg-[#263c30] px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        ✨ Special offer: Shop your favourites today!
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-[#e9e7df] bg-[#faf9f6]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="text-2xl font-extrabold tracking-tight text-[#263c30] sm:text-3xl">
            noorify<span className="text-[#b28b60]">.</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#home" className="hover:text-[#a47c51]">Home</a>
            <a href="#products" className="hover:text-[#a47c51]">Shop</a>
            <a href="#about" className="hover:text-[#a47c51]">About</a>
            <a href="#footer" className="hover:text-[#a47c51]">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                document.getElementById('products')?.scrollIntoView()
                setMenuOpen(false)
              }}
              className="hidden rounded-full border border-[#deddd4] px-4 py-2 text-sm font-semibold sm:block"
            >
              Explore
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open shopping cart"
              className="relative rounded-full bg-[#263c30] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#385643]"
            >
              🛍 Cart
              {cartCount > 0 && (
                <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#263c30]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="text-2xl md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="flex flex-col gap-4 border-t border-[#e9e7df] bg-[#faf9f6] px-6 py-5 text-sm font-semibold md:hidden">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#products" onClick={() => setMenuOpen(false)}>Shop</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* Hero section */}
      <main>
        <section id="home" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-block rounded-full bg-[#e9eee4] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#49644b]">
              Your everyday style destination
            </span>

            <h1 className="mt-6 max-w-xl font-['Playfair_Display'] text-5xl font-bold leading-tight tracking-tight text-[#263c30] sm:text-6xl lg:text-7xl">
              Style that feels
              <span className="block italic text-[#b28b60]">like you.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#72766e] sm:text-lg">
              Discover thoughtfully selected fashion, timeless
              accessories and everyday essentials made for your style.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-full bg-[#263c30] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#385643]"
              >
                Shop Collection →
              </a>
              <a
                href="#about"
                className="rounded-full border border-[#d8d7cd] px-7 py-3.5 text-sm font-bold transition hover:bg-white"
              >
                Our Story
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-[#e5e3da] pt-6">
              <div>
                <p className="text-2xl font-extrabold text-[#263c30]">8+</p>
                <p className="mt-1 text-xs text-[#777a73]">Curated products</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#263c30]">4.8/5</p>
                <p className="mt-1 text-xs text-[#777a73]">Sample rating</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#263c30]">100%</p>
                <p className="mt-1 text-xs text-[#777a73]">Style focused</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full bg-[#e5d5bd] sm:-right-5 sm:-top-5 sm:h-40 sm:w-40" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-[#dfe7d9] sm:-bottom-6 sm:-left-6 sm:h-44 sm:w-44" />
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="Fashion collection inspiration"
              className="relative z-10 h-[380px] w-full rounded-[2rem] object-cover shadow-xl sm:h-[520px]"
            />
            <div className="absolute bottom-5 left-5 z-20 rounded-2xl bg-white/95 p-4 shadow-lg sm:bottom-8 sm:left-8">
              <p className="text-xs text-[#777a73]">A little more you</p>
              <p className="mt-1 font-bold text-[#263c30]">New Season Edit ✨</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-y border-[#e9e7df] bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="text-sm font-bold">Delivery Options</p>
                <p className="mt-1 text-xs text-gray-500">Shipping details at checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">💎</span>
              <div>
                <p className="text-sm font-bold">Curated Collection</p>
                <p className="mt-1 text-xs text-gray-500">Styles picked with care</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-sm font-bold">We're Here to Help</p>
                <p className="mt-1 text-xs text-gray-500">Customer support information</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a47c51]">
                Made for your everyday
              </p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-bold sm:text-4xl">
                Shop our collection
              </h2>
              <p className="mt-3 text-sm text-[#777a73]">
                Find your next favourite piece.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:w-72">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-xl border border-[#deddd4] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#526b52]"
              />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
                className="rounded-xl border border-[#deddd4] bg-white px-4 py-3 text-sm outline-none focus:border-[#526b52]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? 'bg-[#263c30] text-white'
                    : 'border border-[#deddd4] bg-white text-[#555b52] hover:border-[#263c30]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm text-[#777a73]">
            Showing {filteredProducts.length} products
          </p>

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#eeece4] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-[#f0eee7]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-[#263c30]">
                    {product.tag}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-3 right-3 rounded-full bg-white px-4 py-3 text-sm font-bold text-[#263c30] shadow-md transition hover:bg-[#263c30] hover:text-white"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    + Add to cart
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-[#a47c51]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 font-bold">{product.name}</h3>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-[#263c30]">
                        {money(product.price)}
                      </span>
                      <span className="ml-2 text-xs text-gray-400 line-through">
                        {money(product.oldPrice)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#92723d]">
                      ★ {product.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#deddd4] py-16 text-center">
              <p className="text-3xl">🔎</p>
              <h3 className="mt-3 text-lg font-bold">No products found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try another search or category.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('All')
                }}
                className="mt-5 rounded-full bg-[#263c30] px-5 py-3 text-sm font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* About banner */}
        <section id="about" className="bg-[#e9eee4]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6a8065]">
                The Noorify feeling
              </p>
              <h2 className="mt-4 font-['Playfair_Display'] text-3xl font-bold leading-tight sm:text-5xl">
                Less ordinary.
                <br />
                More your style.
              </h2>
            </div>
            <div>
              <p className="max-w-xl leading-7 text-[#606b5d]">
                Noorify is a fashion store concept built around effortless
                style, thoughtful choices and everyday essentials. Explore
                pieces that help you express your own personality.
              </p>
              <a
                href="#products"
                className="mt-6 inline-block rounded-full bg-[#263c30] px-6 py-3 font-bold text-white transition hover:bg-[#385643]"
              >
                Discover your style →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-[#263c30] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <a href="#home" className="text-3xl font-extrabold">
              noorify<span className="text-[#d7b38c]">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
              Everyday essentials. Timeless style. A fashion store concept
              created with React and Tailwind CSS.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/70">
              <a href="#home" className="hover:text-white">Home</a>
              <a href="#products" className="hover:text-white">Shop Products</a>
              <a href="#about" className="hover:text-white">About Us</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Stay in the loop</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">
              This demo store is ready for your next frontend project.
            </p>
            <a
              href="mailto:hello@example.com"
              className="mt-4 inline-block rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#263c30]"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="border-t border-white/15 px-4 py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Noorify. Portfolio demo project.
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 h-full w-full bg-black/40"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#faf9f6] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e5e3da] px-5 py-5">
              <div>
                <h2 className="text-xl font-extrabold">Your Cart</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {cartCount} item(s)
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-[#deddd4] px-3 py-2"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="text-5xl">🛍️</span>
                  <h3 className="mt-4 text-lg font-bold">Your cart is empty</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Find something you love.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false)
                      document.getElementById('products')?.scrollIntoView()
                    }}
                    className="mt-5 rounded-full bg-[#263c30] px-5 py-3 text-sm font-bold text-white"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-[#e5e3da] bg-white p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-20 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold">{item.name}</h3>
                      <p className="mt-2 text-sm font-bold text-[#526b52]">
                        {money(item.price)}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[#e5e3da] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="text-xl font-extrabold">
                  {money(cartTotal)}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Delivery charges, if any, are not included.
              </p>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="mt-5 w-full rounded-full bg-[#263c30] px-5 py-4 font-bold text-white transition hover:bg-[#385643] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed to Checkout →
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-[#263c30] px-5 py-4 text-center text-sm font-semibold text-white shadow-xl"
        >
          {notice}
        </div>
      )}
    </div>
  )
}

export default App
