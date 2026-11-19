
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        name: "Biscuits",
        image: "/images/biscuits.jpg",
        description: "Biscuits and cookies"
    },
    {
        name: "Snacks",
        image: "/images/snacks.jpg",
        description: "Chips and namkeen"
    },
    {
        name: "Chocolate",
        image: "/images/chocolate.jpg",
        description: "Chocolates and treats"
    },
    {
        name: "Drinks",
        image: "/images/drinks.jpg",
        description: "Refreshing beverages"
    },
    {
        name: "Personal Care",
        image: "/images/personal-care.jpg",
        description: "Daily personal essentials"
    },
    {
        name: "Household",
        image: "/images/household.jpg",
        description: "Household essentials"
    }
];

function Home() {
    const [showIntro, setShowIntro] = useState(() => {
        try {
            return sessionStorage.getItem("taraIntroPlayed") !== "yes";
        } catch {
            return true;
        }
    });

    useEffect(() => {
        if (!showIntro) return;

        const timer = setTimeout(() => {
            setShowIntro(false);

            try {
                sessionStorage.setItem("taraIntroPlayed", "yes");
            } catch {
                // Intro still works if session storage is unavailable.
            }
        }, 2800);

        return () => clearTimeout(timer);
    }, [showIntro]);

    const skipIntro = () => {
        setShowIntro(false);

        try {
            sessionStorage.setItem("taraIntroPlayed", "yes");
        } catch {
            // Skip still works if session storage is unavailable.
        }
    };

    return (
        <div className="home tara-home">

            {showIntro && (
                <div className="tara-intro" role="status" aria-label="Tara General Store intro">
                    <div className="intro-orbit orbit-one"></div>
                    <div className="intro-orbit orbit-two"></div>

                    <div className="intro-star">
                        <span>✦</span>
                    </div>

                    <div className="intro-light"></div>

                    <p className="intro-caption">A LITTLE SPARK OF MAGIC</p>

                    <h1 className="intro-brand">
                        TARA<span>.</span>
                    </h1>

                    <p className="intro-subtitle">EVERYDAY SHOPPING, REIMAGINED</p>

                    <button
                        type="button"
                        className="intro-skip"
                        onClick={skipIntro}
                    >
                        Skip intro →
                    </button>
                </div>
            )}

            <section className="hero tara-hero">
                <div className="hero-stars" aria-hidden="true">
                    <span>✦</span>
                    <span>✧</span>
                    <span>✦</span>
                    <span>✧</span>
                    <span>✦</span>
                </div>

                <div className="hero-glow hero-glow-one"></div>
                <div className="hero-glow hero-glow-two"></div>

                <div className="hero-content tara-hero-content">
                    <div className="tara-pill">
                        <span className="live-dot"></span>
                        YOUR EVERYDAY STORE, WITH A SPARK
                    </div>

                    <h1>
                        Little Things.
                        <br />
                        <span>Big Happiness.</span>
                    </h1>

                    <p className="hero-description">
                        From your favourite snacks to everyday essentials,
                        find a little something for every moment.
                    </p>

                    <div className="tara-hero-actions">
                        <Link to="/products" className="hero-btn tara-primary-btn">
                            Explore Store <span>↗</span>
                        </Link>

                        <a href="#tara-categories" className="tara-secondary-btn">
                            Discover Categories ↓
                        </a>
                    </div>

                    <div className="tara-hero-note">
                        <span className="note-star">✦</span>
                        YOUR DAILY FAVOURITES, ALL IN ONE PLACE
                    </div>
                </div>

                <div className="hero-bottom-glow"></div>
            </section>

            <section
                className="featured-section tara-featured"
                id="tara-categories"
            >
                <div className="tara-section-heading">
                    <div>
                        <p className="section-subtitle">
                            FIND YOUR FAVOURITES
                        </p>

                        <h2 className="section-title">
                            Your world of <span>everyday essentials.</span>
                        </h2>

                        <p className="section-description">
                            Six little corners. Everything you need.
                        </p>
                    </div>

                    <Link to="/products" className="tara-view-all">
                        View all products ↗
                    </Link>
                </div>

                <div className="products-grid category-grid tara-category-grid">
                    {categories.map((category, index) => (
                        <Link
                            to={`/products?category=${encodeURIComponent(category.name)}`}
                            className="category-card tara-category-card"
                            key={category.name}
                            style={{ "--card-index": index }}
                        >
                            <div className="tara-category-image">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    loading="lazy"
                                />
                                <span className="tara-card-number">
                                    0{index + 1}
                                </span>
                                <span className="tara-card-arrow">↗</span>
                            </div>

                            <div className="tara-category-info">
                                <h3>{category.name}</h3>
                                <p>{category.description}</p>
                                <span className="tara-explore">
                                    Explore collection <span>→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="tara-promo">
                <div className="tara-promo-glow"></div>

                <div className="tara-promo-content">
                    <p className="section-subtitle">THE TARA EXPERIENCE</p>

                    <h2>
                        Your everyday.
                        <br />
                        <span>A little more special.</span>
                    </h2>

                    <p>
                        Shopping for the little things should feel good.
                        Discover your favourites, find what you need,
                        and make every visit simple.
                    </p>

                    <Link to="/products" className="hero-btn tara-primary-btn">
                        Start Exploring ↗
                    </Link>
                </div>

                <div className="tara-promo-symbol" aria-hidden="true">
                    <span className="promo-star">✦</span>
                    <span className="promo-ring ring-one"></span>
                    <span className="promo-ring ring-two"></span>
                    <span className="promo-ring ring-three"></span>
                </div>
            </section>

            <section className="benefits-section tara-benefits">
                <p className="section-subtitle">SMALL THINGS. BETTER DAYS.</p>

                <h2>Why Shop With Tara?</h2>

                <p className="benefits-description">
                    A simpler, more enjoyable way to shop for everyday needs.
                </p>

                <div className="benefits-grid">
                    <div className="benefit-card tara-benefit-card">
                        <span className="benefit-icon">✦</span>
                        <h3>Everyday Favourites</h3>
                        <p>Your daily needs and favourite treats in one place.</p>
                    </div>

                    <div className="benefit-card tara-benefit-card">
                        <span className="benefit-icon">◈</span>
                        <h3>Budget Friendly</h3>
                        <p>Discover products that fit your everyday budget.</p>
                    </div>

                    <div className="benefit-card tara-benefit-card">
                        <span className="benefit-icon">↗</span>
                        <h3>Easy Shopping</h3>
                        <p>Browse collections and add your favourites to cart.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
