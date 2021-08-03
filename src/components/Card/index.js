import React from 'react';
import CardItem from './CardItem';
import './styles.scss';


function Card() {
    return (
      <div className='cards'>
        <h1 className="h1card">TOP SELLER</h1>
        <div className="line"></div>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
            <CardItem src={"https://www.calliemask.co/storage/media/e0u3sR290k28JrTHW6PavDTb42SzVHqEOvAueMSV.jpeg"} label="Face Mask" text={"Headloop Design - Pink Beret [50 pcs]"} path='/search' />
            <CardItem src={"https://www.calliemask.co/storage/media/e0u3sR290k28JrTHW6PavDTb42SzVHqEOvAueMSV.jpeg"} label="Face Mask" text={"Headloop Design - Pink Beret [50 pcs]"} path='/search' />
            <CardItem src={"https://www.calliemask.co/storage/media/e0u3sR290k28JrTHW6PavDTb42SzVHqEOvAueMSV.jpeg"} label="Face Mask" text={"Headloop Design - Pink Beret [50 pcs]"} path='/search' />
            <CardItem src={"https://www.calliemask.co/storage/media/e0u3sR290k28JrTHW6PavDTb42SzVHqEOvAueMSV.jpeg"} label="Face Mask" text={"Headloop Design - Pink Beret [50 pcs]"} path='/search' />

            </ul>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default Card;