import React from 'react'
import { footSocial, footMenu } from '../data/footerData'
import '../stylings/footer.css'

const Footer = () => {
  return (
    <footer className="footer">

      {/* TOP */}
      <div className="footer-top">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>Tech-Shop</h2>
          <p>
            Subscribe to our email alerts to receive early discount offers
            and new product information.
          </p>

          <div className="subscribe-box">
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* MENUS */}
        <div className="footer-menus">
          {footMenu.map((section) => (
            <div className="footer-menu" key={section.id}>
              <h4>{section.title}</h4>
              <ul>
                {section.menu.map((item) => (
                  <li key={item.id}>{item.link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2025 Tech-Shop. All Rights Reserved.</p>

        <div className="footer-social">
          {footSocial.map((item) => {
            const Icon = item.icon
            return (
              <span key={item.id}>
                <Icon />
              </span>
            )
          })}
        </div>
      </div>

    </footer>
  )
}

export default Footer
