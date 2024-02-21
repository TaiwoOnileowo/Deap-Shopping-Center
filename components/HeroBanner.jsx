import Link from 'next/link'
import React from 'react'
import { urlForImage } from '../sanity/lib/image'
import Image from 'next/image'
const HeroBanner = ({heroBanner}) => {
  return (
    <div className='hero-banner-container'>
        <div className='hero-banner'>
            <div className='banner-text'>
            <p className='beats-solo'>
                {heroBanner?.smallText}
            </p>
            <h3>{heroBanner?.midText}</h3>
            <h1 className='large-text'>{heroBanner?.largeText1}</h1>
                <Link href={`/product/${heroBanner?.product}`}>
                    <button type='button' >{heroBanner?.buttonText}</button>
                </Link>
            </div>
            
            <div className='banner-image'>
          


<Image src={heroBanner && heroBanner?.image && urlForImage(heroBanner.image)}  priority={true}  alt="headphones" className='hero-banner-image' width={450} height={450}/>

                </div>
                
            
        </div>
        <div className='desc'>
                    <p>{heroBanner?.desc}</p>

                </div>
    </div>
  )
}

export default HeroBanner