import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, PageTransition } from './components/layout';
import { MotionProvider } from './components/providers/MotionProvider';
import { LoadingDots } from '@/components/signatures';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.default })));
const DetailDestination = lazy(() => import("./pages/DetailDestination").then(m => ({ default: m.default })));
const Destinations = lazy(() => import("./pages/Destinations").then(m => ({ default: m.default })));
const Hotels = lazy(() => import("./pages/Hotels").then(m => ({ default: m.default })));
const HotelDetail = lazy(() => import("./pages/HotelDetail").then(m => ({ default: m.default })));
const Promo = lazy(() => import("./pages/Promo").then(m => ({ default: m.default })));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.default })));
const Register = lazy(() => import("./pages/Register").then(m => ({ default: m.default })));
const Culinary = lazy(() => import("./pages/Culinary").then(m => ({ default: m.default })));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword").then(m => ({ default: m.default })));
const Terms = lazy(() => import("./pages/Terms").then(m => ({ default: m.default })));
const PrivacyPolicy = lazy(() => import("./pages/Privacy").then(m => ({ default: m.default })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.default })));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-bg">
      <LoadingDots size="lg" text="Memuat halaman..." />
    </div>
  );
}

function SEO({ title, description, image, url, type = 'website' }) {
  const siteName = 'TraveLindo';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Platform perencanaan perjalanan terpercaya untuk mengeksplorasi keindahan tersembunyi Indonesia. Temukan destinasi, kuliner, dan penginapan terbaik.';
  const defaultImage = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="theme-color" content="#C85C3E" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'TraveLindo',
          url: 'https://travelindo.id',
          logo: 'https://travelindo.id/logo.png',
          description: 'Platform perencanaan perjalanan terpercaya untuk mengeksplorasi keindahan Indonesia',
          areaServed: 'ID',
          priceRange: '$$',
        })}
      </script>
    </Helmet>
  );
}

function App() {
  return (
    <HelmetProvider>
      <MotionProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route element={<PageTransition />}>
                  <Route
                    path="/"
                    element={
                      <>
                        <SEO title="Temukan Keindahan Tersembunyi Indonesia" />
                        <Home />
                      </>
                    }
                  />
                  <Route
                    path="/destination/:id"
                    element={
                      <>
                        <SEO title="Detail Destinasi" />
                        <DetailDestination />
                      </>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <>
                        <SEO title="Masuk - TraveLindo" />
                        <Login />
                      </>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <>
                        <SEO title="Daftar - TraveLindo" />
                        <Register />
                      </>
                    }
                  />
                  <Route
                    path="/destinations"
                    element={
                      <>
                        <SEO title="Destinasi Wisata Indonesia" description="Jelajahi 50+ destinasi wisata menakjubkan di seluruh Indonesia. Filter berdasarkan wilayah, budget, dan rating." />
                        <Destinations />
                      </>
                    }
                  />
                  <Route
                    path="/culinary"
                    element={
                      <>
                        <SEO title="Kuliner Khas Nusantara" description="Cicipi kekayaan rasa Indonesia dari berbagai wilayah. Temukan kuliner khas terdekat." />
                        <Culinary />
                      </>
                    }
                  />
                  <Route
                    path="/hotels"
                    element={
                      <>
                        <SEO title="Penginapan Eksklusif" description="Temukan hotel, resort, dan villa terbaik di Indonesia untuk liburan Anda." />
                        <Hotels />
                      </>
                    }
                  />
                  <Route
                    path="/hotels/:id"
                    element={
                      <>
                        <SEO title="Detail Penginapan" description="Lihat detail penginapan terbaik di Indonesia." />
                        <HotelDetail />
                      </>
                    }
                  />
                  <Route
                    path="/promo"
                    element={
                      <>
                        <SEO title="Promo & Penawaran Eksklusif" description="Dapatkan diskon hingga 30% untuk liburan impian Anda. Gunakan kode promo saat checkout." />
                        <Promo />
                      </>
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <>
                        <SEO title="Lupa Kata Sandi" />
                        <ForgotPassword />
                      </>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <>
                        <SEO title="Syarat & Ketentuan" />
                        <Terms />
                      </>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <>
                        <SEO title="Kebijakan Privasi" />
                        <PrivacyPolicy />
                      </>
                    }
                  />
                  <Route
                    path="/404"
                    element={
                      <>
                        <SEO title="Halaman Tidak Ditemukan" description="Halaman yang Anda cari tidak ditemukan." />
                        <NotFound />
                      </>
                    }
                  />
                </Route>
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </MotionProvider>
    </HelmetProvider>
  );
}

export default App;