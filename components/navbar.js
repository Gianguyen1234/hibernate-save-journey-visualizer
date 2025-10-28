class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(20, 25, 40, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .logo {
          color: #00e0ff;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.5px;
        }
        .logo i {
          color: #00e0ff;
        }
        .subscribe-btn {
          background: linear-gradient(135deg, #ff0000, #ff4d4d);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 12px rgba(255, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
        }
      </style>
      <nav>
        <div class="logo">
          <i data-feather="film"></i>
          <span>Hibernate Visualizer</span>
        </div>
        <button class="subscribe-btn" id="subscribe-btn">
          <i data-feather="youtube"></i> Subscribe
        </button>
      </nav>
    `;

    // Gắn link tới kênh YouTube của bạn
    const btn = this.shadowRoot.getElementById('subscribe-btn');
    btn.addEventListener('click', () => {
      window.open('https://www.youtube.com/@dev-maniac2349', '_blank');
    });

    // Kích hoạt Feather Icons
    feather.replace({ 'stroke-width': 1.5 });
  }
}

customElements.define('custom-navbar', CustomNavbar);
