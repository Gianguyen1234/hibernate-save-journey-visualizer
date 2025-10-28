class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #e2e8f0;
          padding: 2rem;
          text-align: center;
          margin-top: auto;
          position: relative;
          overflow: hidden;
        }

        /* Hiệu ứng ánh sáng chuyển động */
        footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
          background: linear-gradient(120deg, rgba(56, 189, 248, 0.1), rgba(29, 78, 216, 0.15), rgba(56, 189, 248, 0.1));
          transform: skewX(-25deg);
          animation: moveGradient 8s linear infinite;
        }

        @keyframes moveGradient {
          0% { transform: translateX(-50%) skewX(-25deg); }
          100% { transform: translateX(50%) skewX(-25deg); }
        }

        .footer-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-links a {
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.3s, transform 0.3s;
        }

        .footer-links a:hover {
          color: #38bdf8;
          transform: translateY(-2px);
        }

        .copyright {
          font-size: 0.875rem;
          color: #94a3b8;
          opacity: 0;
          animation: fadeIn 1.2s ease 0.5s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>

      <footer>
        <div class="footer-content">
          <div class="footer-links">
            <a href="https://github.com/Gianguyen1234" target="_blank">
              <i data-feather="github"></i> GitHub
            </a>
            <a href="https://www.facebook.com/groups/501799607277748" target="_blank">
              <i data-feather="users"></i> DEV Talk Group
            </a>
          </div>
          <p class="copyright">
            &copy; 2025 Hibernate Save Journey Visualizer. Educational project. Created by <span style="color:#38bdf8;font-weight:600;">Holy_Dev</span>
          </p>
        </div>
      </footer>
    `;

    feather.replace({ 'stroke-width': 1.5 });
  }
}

customElements.define('custom-footer', CustomFooter);
