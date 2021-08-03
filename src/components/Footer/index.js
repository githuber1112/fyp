import React from 'react';
import Button from '../forms/Button';
import { Link } from 'react-router-dom';
import './styles.scss';

function Footer() {
    return (
      <div className='footer-container'>
        <section className='footer-subscription'>
          <p className='footer-subscription-heading'>
            Join the newletter to receive the best deal!
          </p>
          <p className='footer-subscription-text'>
            You can unsubscribe at any time.
          </p>
          <div className='input-areas'>
            <form>
              <input
                className='footer-input'
                name='email'
                type='email'
                placeholder='Your Email'
              />
              <Button buttonStyle='btn--outline'>Subscribe</Button>
            </form>
          </div>
        </section>
        <div class='footer-links'>
          <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
              <h2>About Us</h2>
              <Link to='/sign-up'>How it works</Link>
              <Link to='/'>Testimonials</Link>
              <Link to='/'>Careers</Link>
              <Link to='/'>Investors</Link>
              <Link to='/'>Terms of Service</Link>
            </div>
            <div class='footer-link-items'>
              <h2>Contact Us</h2>
              <Link to='/'>Contact</Link>
              <Link to='/'>Support</Link>
              <Link to='/'>Destinations</Link>
              <Link to='/'>Sponsorships</Link>
            </div>
          </div>
            
        </div>
        <section class='social-media'>
          <div class='social-media-wrap'>
            
            <small class='website-rights'>elonMask © 2020</small>
            <div class='social-icons'>
              <Link
                class='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <i class='fab fa-facebook-f' />
              </Link>
              <Link
                class='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
              >
                <i class='fab fa-instagram' />
              </Link>
             
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Footer;