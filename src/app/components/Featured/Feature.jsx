"use client"
import React from 'react'
import PostRow from './PostRow';
import styles from './Feature.module.css'
function Feature() {
    const posts1 = [
      { id: 1, title: "Niagara Falls Tour", category: "bar", price: 94, img: 'https://i.ibb.co/T8fLGjy/Rectangle-22-4.png', tags: ['Easy refund', 'Instant confirmation'] , description: "Attraction passes. NewYork"},
      { id: 2, title: "Broadway Show", category: "broadway", price: 120, img: 'https://i.ibb.co/94rVwxs/Rectangle-22-5.png', tags: ['Theater', 'Musical'], description: "Attraction passes. NewYork" },
      { id: 3, title: "NYC Park Tour", category: "park", price: 100, img: 'https://i.ibb.co/2Kdq5rF/Rectangle-22-6.png', tags: ['Outdoor', 'Walking'], description: "Attraction passes. NewYork" },
      { id: 4, title: "Central Park Picnic", category: "park", price: 75, img: 'https://i.ibb.co/XDTkpvb/images.jpg', tags: ['Outdoor', 'Picnic'] , description: "Attraction passes. NewYork" },
      { id: 5, title: "Central Park Picnic", category: "park", price: 75, img: 'https://i.ibb.co/XDTkpvb/images.jpg', tags: ['Outdoor', 'Picnic'] , description: "Attraction passes. NewYork" },
         ];
    
      const posts2 = [
        { id: 1, title: "Niagara Falls Tour", category: "tour", price: 94, img: 'https://i.ibb.co/T8fLGjy/Rectangle-22-4.png', tags: ['Nature', 'Waterfall'] , description: "Attraction passes. NewYork"},
        { id: 2, title: "Broadway Show", category: "broadway", price: 120, img: 'https://i.ibb.co/94rVwxs/Rectangle-22-5.png', tags: ['Theater', 'Musical'], description: "Attraction passes. NewYork" },
        { id: 3, title: "NYC Park Tour", category: "park", price: 100, img: 'https://i.ibb.co/2Kdq5rF/Rectangle-22-6.png', tags: ['Outdoor', 'Walking'], description: "Attraction passes. NewYork" },
        { id: 4, title: "Central Park Picnic", category: "park", price: 75, img: 'https://i.ibb.co/XDTkpvb/images.jpg', tags: ['Outdoor', 'Picnic'] , description: "Attraction passes. NewYork" },
        { id: 5, title: "Central Park Picnic", category: "park", price: 75, img: 'https://i.ibb.co/XDTkpvb/images.jpg', tags: ['Outdoor', 'Picnic'] , description: "Attraction passes. NewYork" },
      
    ]
  
  return (
    <div className={styles.mainsection}>
      <h2 className={styles.title}>Featured places</h2>
      <PostRow posts={posts1} />
      <PostRow posts={posts2} />
    </div>
  )
}

export default Feature
