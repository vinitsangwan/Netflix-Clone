
import '../App.css';
const trendingImages = [
  'netfliximage1.png',
  'netfliximage2.png',
  'netfliximage3.png',
  'netfliximage4.png',
  'netfliximage5.png',
  'netfliximage6.png',
];

const features = [
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
];

//use of Javascript here to make buttond working 
const faqs = [
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
];

function Home() {
  const handleGetStarted = (event) => {
    event.preventDefault();

    const email = event.currentTarget.querySelector('input').value.trim();

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
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
              <select
                className="language-select"
                aria-label="Select language"
                defaultValue="English"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
              </select>

              <button
                className="sign-in-btn"
                type="button"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                Sign In
              </button>
            </div>
          </nav>

          <div className="hero-content">
            <h1>Unlimited movies, TV shows and more</h1>

            <p className="hero-subtitle">
              Watch anywhere. Cancel anytime.
            </p>

            <p className="hero-description">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            <form className="email-form" onSubmit={handleGetStarted}>
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                autoComplete="email"
                required
              />

              <button className="get-started-btn" type="submit">
                Get Started <span aria-hidden="true">›</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="trending-section">
        <h2>Trending Now</h2>

        <div className="trending-list">
          {trendingImages.map((image, index) => (//used map function to loop through the images and display them in the trending section
            <div className="trending-card" key={image}>
              <span className="trending-number">{index + 1}</span>
              <img src={`/${image}`} alt={`Trending title ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2>More reasons to join</h2>

        <div className="features-grid">
          {features.map((feature) => (
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
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.map((faq) => (
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
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <form className="email-form" onSubmit={handleGetStarted}>
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              autoComplete="email"
              required
            />

            <button className="get-started-btn" type="submit">
              Get Started <span aria-hidden="true">›</span>
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <p className="contact-text">
          Questions? Call <a href="tel:0008009191743">000-800-919-1743</a>
        </p>

        <div className="footer-links">
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="https://media.netflix.com/">Media Center</a></li>
            <li><a href="https://www.netflix.com/">Ways to Watch</a></li>
            <li><a href="https://www.netflix.com/">Cookie Preferences</a></li>
            <li><a href="https://fast.com/">Speed Test</a></li>
          </ul>

          <ul>
            <li><a href="https://help.netflix.com/">Help Centre</a></li>
            <li><a href="https://ir.netflix.net/">Investor Relations</a></li>
            <li><a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a></li>
            <li><a href="https://about.netflix.com/">Corporate Information</a></li>
            <li><a href="https://help.netflix.com/">Legal Notices</a></li>
          </ul>

          <ul>
            <li><a href="https://www.netflix.com/YourAccount">Account</a></li>
            <li><a href="https://jobs.netflix.com/">Jobs</a></li>
            <li><a href="https://help.netflix.com/">Privacy</a></li>
            <li><a href="https://help.netflix.com/">Contact Us</a></li>
            <li><a href="https://www.netflix.com/">Only on Netflix</a></li>
          </ul>
        </div>

        <select
          className="footer-language"
          aria-label="Select footer language"
          defaultValue="English"
        >
          <option value="English">English</option>
          <option value="Hindi">हिंदी</option>
        </select>

        <p className="country-name">Netflix India</p>

        <p className="recaptcha-text">
          This page is a student-made Netflix-style clone and is not an
          official Netflix website.
        </p>
      </footer>
    </div>
  );
}

export default Home;