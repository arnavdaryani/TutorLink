import React, { useState, useEffect } from 'react';

function BubbleCollapse() {
    // Track how far the user has scrolled vertically
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Define a collapse factor (0 to 1) based on a 300px threshold
    const collapseFactor = Math.min(scrollY / 300, 1);

    // Dynamically update the bubble’s transform and opacity:
    // - Translate upward by up to 200px
    // - Scale down to 30% of its original size
    // - Fade out completely at full collapse
    const dynamicBubbleStyle = {
        transform: `translate(-50%, calc(-50% - ${collapseFactor * 200}px)) scale(${1 - collapseFactor * 0.7})`,
        opacity: 1 - collapseFactor,
    };

    // Inline CSS for the component
    const css = `
    /* Reset defaults */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
      height: 100%;
      background: #000; /* Black background */
    }
    /* Main container with extra height for scrolling */
    .container {
      width: 100vw;
      min-height: 200vh;
      position: relative;
      overflow: hidden;
      background: #000;
    }
    /* The hero section fills the first viewport */
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* The large pastel bubble */
    .bubble {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(30px);
      z-index: 1;
      /* Pastel color animation */
      animation: colorShift 8s infinite alternate;
    }
    @keyframes colorShift {
      0%   { background: #F7C8E0; } /* Pastel Pink */
      25%  { background: #CDE7FF; } /* Pastel Blue */
      50%  { background: #E7FFD9; } /* Pastel Green */
      75%  { background: #FFEBCC; } /* Pastel Peach */
      100% { background: #F7C8E0; }
    }
    /* Extra content below the hero section */
    .extra-content {
      margin-top: 2rem;
      padding: 2rem;
      color: #fff;
      font-size: 1.2rem;
      text-align: center;
      position: relative;
      z-index: 2;
    }
  `;

    return (
        <>
            <style>{css}</style>
            <div className="container">
                {/* Hero section: shows only the bubble */}
                <div className="hero">
                    <div className="bubble" style={dynamicBubbleStyle}></div>
                </div>
                {/* Extra content: the bubble will collapse toward this area as you scroll */}
                <div className="extra-content">
                    <h2>Extra Content</h2>
                    <p>
                        As you scroll, the bubble above will gradually collapse—moving upward,
                        shrinking, and fading until it disappears—seemingly merging into this
                        section.
                    </p>
                    <p>
                        You can add any additional text or components here.
                    </p>
                </div>
            </div>
        </>
    );
}

export default BubbleCollapse;
