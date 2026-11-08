import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const trendingItems = [
  {
    title: 'Wednesday',
    image: 'https://image.tmdb.org/t/p/w500/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
    url: 'https://www.netflix.com/search?q=Wednesday',
  },
  {
    title: 'Stranger Things',
    image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    url: 'https://www.netflix.com/search?q=Stranger%20Things',
  },
  {
    title: 'Squid Game',
    image: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    url: 'https://www.netflix.com/search?q=Squid%20Game',
  },
  {
    title: 'Money Heist',
    image: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    url: 'https://www.netflix.com/search?q=Money%20Heist',
  },
  {
    title: 'Lucifer',
    image: 'https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg',
    url: 'https://www.netflix.com/search?q=Lucifer',
  },
  {
    title: 'Dhurandhar',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg',
    url: 'https://www.netflix.com/search?q=Dhurandhar',
  },
  {
    title: 'Breaking Bad',
    image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    url: 'https://www.netflix.com/search?q=Breaking%20Bad',
  },
  {
    title: 'Peaky Blinders',
    image: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
    url: 'https://www.netflix.com/search?q=Peaky%20Blinders',
  },
  {
    title: 'All of Us Are Dead',
    image: 'https://image.tmdb.org/t/p/w500/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg',
    url: 'https://www.netflix.com/search?q=All%20of%20Us%20Are%20Dead',
  },
  {
    title: 'Bridgerton',
    image: 'https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg',
    url: 'https://www.netflix.com/search?q=Bridgerton',
  },
];

const content = {
  English: {
    signIn: 'Sign In',
    searchPlaceholder: 'Search movies...',
    heroTitle: 'Unlimited movies, TV shows and more',
    heroSubtitle: 'Watch anywhere. Cancel anytime.',
    heroDescription:
      'Ready to watch? Enter your email to create or restart your membership.',
    emailPlaceholder: 'Email address',
    getStarted: 'Get Started',
    trendingTitle: 'Trending Now',
    reasonsTitle: 'More reasons to join',
    faqTitle: 'Frequently Asked Questions',
    contactText: 'Questions? Call',
    faqLink: 'FAQ',
    mediaCenter: 'Media Center',
    waysToWatch: 'Ways to Watch',
    cookiePreferences: 'Cookie Preferences',
    speedTest: 'Speed Test',
    helpCentre: 'Help Centre',
    investorRelations: 'Investor Relations',
    termsOfUse: 'Terms of Use',
    corporateInformation: 'Corporate Information',
    legalNotices: 'Legal Notices',
    account: 'Account',
    jobs: 'Jobs',
    privacy: 'Privacy',
    contactUs: 'Contact Us',
    onlyOnNetflix: 'Only on Netflix',
    country: 'Netflix India',
    disclaimer:
      'This page is a student-made Netflix-style clone and is not an official Netflix website.',
    emailRequiredAlert: 'Please enter your email address.',
    emailValidAlert: 'Please enter a valid email address.',
    features: [
      {
        title: 'Enjoy on your TV',
        description:
          'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
        image: 'box1netfliximage-removebg-preview.png',
      },
      {
        title: 'Download your shows to watch offline',
        description:
          'Save your favourites easily and always have something to watch.',
        image: 'box2netfliximage-removebg-preview.png',
      },
      {
        title: 'Watch everywhere',
        description:
          'Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.',
        image: 'box3netfliximage-removebg-preview.png',
      },
      {
        title: 'Create profiles for kids',
        description:
          'Send kids on adventures with their favourite characters in a space made just for them — free with your membership.',
        image: 'box4netfliximage-removebg-preview.png',
      },
    ],
    faqs: [
      {
        question: 'What is Netflix?',
        answer:
          'Netflix is a streaming service offering a wide variety of TV shows, movies, documentaries and more.',
      },
      {
        question: 'How much does Netflix cost?',
        answer:
          'Plans and prices depend on the membership offered in your region. Visit the official Netflix website for current pricing.',
      },
      {
        question: 'Where can I watch?',
        answer:
          'You can watch on supported smart TVs, phones, tablets, computers and other compatible devices.',
      },
      {
        question: 'How do I cancel?',
        answer:
          'You can manage or cancel your membership through your account settings on the official Netflix website.',
      },
      {
        question: 'What can I watch on Netflix?',
        answer:
          'Netflix offers movies, series, documentaries, and other entertainment. Availability varies by region.',
      },
      {
        question: 'Is Netflix good for kids?',
        answer:
          'Netflix offers kids profiles and parental controls to help families manage what children can watch.',
      },
    ],
  },
  Hindi: {
    signIn: 'साइन इन करें',
    searchPlaceholder: 'फ़िल्में खोजें...',
    heroTitle: 'अनलिमिटेड फ़िल्में, टीवी शो और बहुत कुछ',
    heroSubtitle: 'जहाँ चाहें देखें. जब चाहें कैंसल करें.',
    heroDescription:
      'देखने के लिए तैयार हैं? अपनी मेंबरशिप बनाने या रीस्टार्ट करने के लिए अपना ईमेल डालें.',
    emailPlaceholder: 'ईमेल एड्रेस',
    getStarted: 'शुरू करें',
    trendingTitle: 'अभी ट्रेंड कर रहे हैं',
    reasonsTitle: 'शामिल होने के और कारण',
    faqTitle: 'अक्सर पूछे जाने वाले सवाल',
    contactText: 'सवाल हैं? कॉल करें',
    faqLink: 'FAQ',
    mediaCenter: 'मीडिया सेंटर',
    waysToWatch: 'देखने के तरीके',
    cookiePreferences: 'कुकी प्राथमिकताएं',
    speedTest: 'स्पीड टेस्ट',
    helpCentre: 'सहायता केंद्र',
    investorRelations: 'निवेशक संबंध',
    termsOfUse: 'उपयोग की शर्तें',
    corporateInformation: 'कंपनी की जानकारी',
    legalNotices: 'कानूनी सूचनाएं',
    account: 'अकाउंट',
    jobs: 'नौकरियां',
    privacy: 'गोपनीयता',
    contactUs: 'हमसे संपर्क करें',
    onlyOnNetflix: 'सिर्फ़ Netflix पर',
    country: 'Netflix भारत',
    disclaimer:
      'यह पेज एक छात्र द्वारा बनाया गया Netflix-स्टाइल क्लोन है और यह आधिकारिक Netflix वेबसाइट नहीं है.',
    emailRequiredAlert: 'कृपया अपना ईमेल एड्रेस दर्ज करें।',
    emailValidAlert: 'कृपया एक मान्य ईमेल एड्रेस दर्ज करें।',
    features: [
      {
        title: 'अपने टीवी पर आनंद लें',
        description:
          'स्मार्ट टीवी, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray प्लेयर और अन्य पर देखें.',
        image: 'box1netfliximage-removebg-preview.png',
      },
      {
        title: 'ऑफ़लाइन देखने के लिए अपने शो डाउनलोड करें',
        description:
          'अपने पसंदीदा शो आसानी से सेव करें और हमेशा कुछ न कुछ देखने के लिए तैयार रखें.',
        image: 'box2netfliximage-removebg-preview.png',
      },
      {
        title: 'हर जगह देखें',
        description:
          'अपने फ़ोन, टैबलेट, लैपटॉप और टीवी पर अनलिमिटेड फ़िल्में और टीवी शो स्ट्रीम करें.',
        image: 'box3netfliximage-removebg-preview.png',
      },
      {
        title: 'बच्चों के लिए प्रोफ़ाइल बनाएं',
        description:
          'बच्चों को उनके पसंदीदा किरदारों के साथ रोमांचक सफ़र पर भेजें — अपनी मेंबरशिप के साथ मुफ़्त.',
        image: 'box4netfliximage-removebg-preview.png',
      },
    ],
    faqs: [
      {
        question: 'Netflix क्या है?',
        answer:
          'Netflix एक स्ट्रीमिंग सर्विस है जिसके ज़रिए आप इंटरनेट से जुड़े हज़ारों डिवाइस पर तरह-तरह के टीवी शो, फ़िल्में, डॉक्युमेंट्रीज़ वगैरह देख सकते हैं.',
      },
      {
        question: 'Netflix की कीमत कितनी है?',
        answer:
          'अपने स्मार्टफ़ोन, टैबलेट, स्मार्ट टीवी, लैपटॉप या स्ट्रीमिंग डिवाइस पर एक तय मासिक शुल्क पर Netflix देखें. प्लान आपके क्षेत्र के अनुसार अलग-अलग होते हैं.',
      },
      {
        question: 'मैं कहाँ देख सकता हूँ?',
        answer:
          'आप समर्थित स्मार्ट टीवी, फ़ोन, टैबलेट, कंप्यूटर और अन्य संगत डिवाइस पर कहीं भी, कभी भी देख सकते हैं.',
      },
      {
        question: 'मैं कैंसल कैसे करूँ?',
        answer:
          'Netflix बहुत आसान और लचीला है. कोई कॉन्ट्रैक्ट नहीं और कोई कैंसलेशन फ़ीस नहीं. आप अपने अकाउंट को ऑनलाइन कभी भी कैंसल कर सकते हैं.',
      },
      {
        question: 'मैं Netflix पर क्या देख सकता हूँ?',
        answer:
          'Netflix पर फ़िल्मों, टीवी शो, एनीमे, डॉक्युमेंट्रीज़ और अन्य मनोरंजन की एक बहुत बड़ी लाइब्रेरी उपलब्ध है.',
      },
      {
        question: 'क्या Netflix बच्चों के लिए अच्छा है?',
        answer:
          'Netflix बच्चों के लिए विशेष प्रोफ़ाइल और पैरेंटल कंट्रोल की सुविधा देता है ताकि बच्चे सुरक्षित मनोरंजन का आनंद ले सकें.',
      },
    ],
  },
};

function Home() {
  const [language, setLanguage] = useState('English');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const carouselRef = useRef(null);
  const recRef = useRef(null);
  const searchRecRef = useRef(null);
  const watchlistRecRef = useRef(null);

  const navigate = useNavigate();
  const t = content[language];

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      const token = sessionStorage.getItem('token');
      if (storedUser && token) {
        setCurrentUser(JSON.parse(storedUser));
        fetchRecommendations(token);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchRecommendations = async (token) => {
    setLoadingRecs(true);
    try {
      const res = await fetch('/api/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    } catch (err) {
      console.error('Fetch recommendations error:', err);
    } finally {
      setLoadingRecs(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setCurrentUser(null);
    setRecommendations(null);
    window.location.reload();
  };

  const scrollRow = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleGetStarted = (event) => {
    event.preventDefault();

    const email = event.currentTarget.querySelector('input').value.trim();

    if (!email) {
      alert(t.emailRequiredAlert);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(t.emailValidAlert);
      return;
    }

    // Temporary frontend behaviour.
    // We will connect this to React authentication later.
    window.location.href = `/register?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="netflix-app">
      <section className="hero">
        <div className="hero-overlay">
          <nav className="navbar">
            <a className="brand" href="/" aria-label="Netflix home">
              <img
                src="/Netflixlogoproject1.png"
                alt="Netflix"
                className="netflix-logo"
              />
            </a>

            <div className="nav-actions">
              <form className="nav-search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="nav-search-input"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search movies"
                />
                <button
                  className="nav-search-btn"
                  type="submit"
                  aria-label="Search"
                >
                  🔍
                </button>
              </form>

              <select
                className="language-select"
                aria-label="Select language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
              </select>

              {currentUser ? (
                <div className="user-nav-actions">
                  <span className="user-nav-name" title={currentUser.email}>
                    {currentUser.name || currentUser.email.split('@')[0]}
                  </span>
                  <button
                    className="sign-out-btn"
                    type="button"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="sign-in-btn"
                  type="button"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  {t.signIn}
                </button>
              )}
            </div>
          </nav>

          <div className="hero-content">
            <h1>{t.heroTitle}</h1>

            <p className="hero-subtitle">{t.heroSubtitle}</p>

            <p className="hero-description">{t.heroDescription}</p>

            <form className="email-form" onSubmit={handleGetStarted}>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                aria-label={t.emailPlaceholder}
                autoComplete="email"
                required
              />

              <button className="get-started-btn" type="submit">
                {t.getStarted} <span aria-hidden="true">›</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Netflix Signature Glowing Red Arc Divider */}
      <div className="netflix-red-curve" aria-hidden="true">
        <div className="curve-line"></div>
      </div>

      <section className="trending-section">
        <h2>{t.trendingTitle}</h2>

        <div className="trending-wrapper">
          <button
            className="carousel-btn prev-btn"
            onClick={() => handleScroll('left')}
            aria-label="Previous"
            type="button"
          >
            ‹
          </button>

          <div className="trending-list" ref={carouselRef}>
            {trendingItems.map((item, index) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="trending-card"
                key={`${item.title}-${index}`}
                title={item.title}
              >
                <span className="trending-number">{index + 1}</span>
                <img
                  src={item.image.startsWith('http') ? item.image : `/${item.image}`}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
              </a>
            ))}
          </div>

          <button
            className="carousel-btn next-btn"
            onClick={() => handleScroll('right')}
            aria-label="Next"
            type="button"
          >
            ›
          </button>
        </div>
      </section>

      {/* Personalized Recommendations Section for Logged-In Users */}
      {currentUser && (
        <section className="recommendations-container">
          {loadingRecs && (
            <div className="recs-loading">
              <p>Personalizing movie recommendations for {currentUser.name || 'you'}...</p>
            </div>
          )}

          {recommendations && recommendations.coldStart && (
            <div className="recs-coldstart-banner">
              <span className="coldstart-icon">✨</span>
              <div>
                <h4>Welcome, {currentUser.name || 'Friend'}!</h4>
                <p>
                  Start searching for movies or adding them to your Watchlist to unlock your personalized recommendation rows here.
                </p>
              </div>
            </div>
          )}

          {/* Row 1: Top Recommendations for You */}
          {recommendations && recommendations.recommendedForYou && recommendations.recommendedForYou.length > 0 && (
            <div className="rec-section">
              <div className="rec-section-header">
                <h2>Top Recommendations for You</h2>
                <span className="rec-badge">Personalized</span>
              </div>
              <div className="trending-wrapper">
                <button
                  className="carousel-btn prev-btn"
                  onClick={() => scrollRow(recRef, 'left')}
                  aria-label="Previous"
                  type="button"
                >
                  ‹
                </button>
                <div className="trending-list rec-list" ref={recRef}>
                  {recommendations.recommendedForYou.map((movie) => (
                    <a
                      href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rec-movie-card"
                      key={`rec-${movie.id}`}
                      title={movie.title}
                    >
                      <div className="rec-poster-box">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {movie.vote_average > 0 && (
                          <span className="rec-rating">★ {movie.vote_average.toFixed(1)}</span>
                        )}
                      </div>
                      <div className="rec-card-info">
                        <h4>{movie.title}</h4>
                        <span>{movie.release_date ? movie.release_date.substring(0, 4) : ''}</span>
                      </div>
                    </a>
                  ))}
                </div>
                <button
                  className="carousel-btn next-btn"
                  onClick={() => scrollRow(recRef, 'right')}
                  aria-label="Next"
                  type="button"
                >
                  ›
                </button>
              </div>
            </div>
          )}

          {/* Row 2: Because You Searched for [Top Genre] */}
          {recommendations && recommendations.basedOnSearch && recommendations.basedOnSearch.length > 0 && (
            <div className="rec-section">
              <div className="rec-section-header">
                <h2>Because You Searched for {recommendations.topGenreName || 'Movies'}</h2>
                <span className="rec-badge search-badge">Based on Searches</span>
              </div>
              <div className="trending-wrapper">
                <button
                  className="carousel-btn prev-btn"
                  onClick={() => scrollRow(searchRecRef, 'left')}
                  aria-label="Previous"
                  type="button"
                >
                  ‹
                </button>
                <div className="trending-list rec-list" ref={searchRecRef}>
                  {recommendations.basedOnSearch.map((movie) => (
                    <a
                      href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rec-movie-card"
                      key={`search-rec-${movie.id}`}
                      title={movie.title}
                    >
                      <div className="rec-poster-box">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {movie.vote_average > 0 && (
                          <span className="rec-rating">★ {movie.vote_average.toFixed(1)}</span>
                        )}
                      </div>
                      <div className="rec-card-info">
                        <h4>{movie.title}</h4>
                        <span>{movie.release_date ? movie.release_date.substring(0, 4) : ''}</span>
                      </div>
                    </a>
                  ))}
                </div>
                <button
                  className="carousel-btn next-btn"
                  onClick={() => scrollRow(searchRecRef, 'right')}
                  aria-label="Next"
                  type="button"
                >
                  ›
                </button>
              </div>
            </div>
          )}

          {/* Row 3: Based on Your Watchlist */}
          {recommendations && recommendations.basedOnWatchlist && recommendations.basedOnWatchlist.length > 0 && (
            <div className="rec-section">
              <div className="rec-section-header">
                <h2>Based on Your Watchlist</h2>
                <span className="rec-badge watchlist-badge">Watchlist Picks</span>
              </div>
              <div className="trending-wrapper">
                <button
                  className="carousel-btn prev-btn"
                  onClick={() => scrollRow(watchlistRecRef, 'left')}
                  aria-label="Previous"
                  type="button"
                >
                  ‹
                </button>
                <div className="trending-list rec-list" ref={watchlistRecRef}>
                  {recommendations.basedOnWatchlist.map((movie) => (
                    <a
                      href={`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rec-movie-card"
                      key={`wl-rec-${movie.id}`}
                      title={movie.title}
                    >
                      <div className="rec-poster-box">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {movie.vote_average > 0 && (
                          <span className="rec-rating">★ {movie.vote_average.toFixed(1)}</span>
                        )}
                      </div>
                      <div className="rec-card-info">
                        <h4>{movie.title}</h4>
                        <span>{movie.release_date ? movie.release_date.substring(0, 4) : ''}</span>
                      </div>
                    </a>
                  ))}
                </div>
                <button
                  className="carousel-btn next-btn"
                  onClick={() => scrollRow(watchlistRecRef, 'right')}
                  aria-label="Next"
                  type="button"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="features-section">
        <h2>{t.reasonsTitle}</h2>

        <div className="features-grid">
          {t.features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <div className="feature-image">
                <img src={`/${feature.image}`} alt="" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>{t.faqTitle}</h2>

        <div className="faq-list">
          {t.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>

              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="bottom-cta">
          <p>{t.heroDescription}</p>

          <form className="email-form" onSubmit={handleGetStarted}>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              aria-label={t.emailPlaceholder}
              autoComplete="email"
              required
            />

            <button className="get-started-btn" type="submit">
              {t.getStarted} <span aria-hidden="true">›</span>
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p className="contact-text">
          {t.contactText} <a href="tel:0008009191743">000-800-919-1743</a>
        </p>

        <div className="footer-links">
          <ul>
            <li><a href="#faq">{t.faqLink}</a></li>
            <li><a href="https://media.netflix.com/">{t.mediaCenter}</a></li>
            <li><a href="https://www.netflix.com/">{t.waysToWatch}</a></li>
            <li><a href="https://www.netflix.com/">{t.cookiePreferences}</a></li>
            <li><a href="https://fast.com/">{t.speedTest}</a></li>
          </ul>

          <ul>
            <li><a href="https://help.netflix.com/">{t.helpCentre}</a></li>
            <li><a href="https://ir.netflix.net/">{t.investorRelations}</a></li>
            <li><a href="https://help.netflix.com/legal/termsofuse">{t.termsOfUse}</a></li>
            <li><a href="https://about.netflix.com/">{t.corporateInformation}</a></li>
            <li><a href="https://help.netflix.com/">{t.legalNotices}</a></li>
          </ul>

          <ul>
            <li><a href="https://www.netflix.com/YourAccount">{t.account}</a></li>
            <li><a href="https://jobs.netflix.com/">{t.jobs}</a></li>
            <li><a href="https://help.netflix.com/">{t.privacy}</a></li>
            <li><a href="https://help.netflix.com/">{t.contactUs}</a></li>
            <li><a href="https://www.netflix.com/">{t.onlyOnNetflix}</a></li>
          </ul>
        </div>

        <select
          className="footer-language"
          aria-label="Select footer language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">हिंदी</option>
        </select>

        <p className="country-name">{t.country}</p>

        <p className="recaptcha-text">{t.disclaimer}</p>
      </footer>
    </div>
  );
}

export default Home;
