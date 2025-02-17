import React from 'react'
import Description from '../components/Article2/Description/Description'
import Hero from '../components/Article2/Hero/Hero'
import Restaurantlist from '../components/Article2/Restaurantlist/Restaurantlist'
const Articles = () => {
 
    const placeData = {
        sections: [
            // "PostDetail your journey begins, you will be greeted by your experienced guide, who will share fascinating insights about Iceland is natural wonders and cultural heritage. The adventure kicks off with a scenic drive along the iconic Ring Road, where you will witness breathtaking landscapes that range from towering glaciers to black sand beaches.",
            // "Your first stop is the mesmerizing Seljalandsfoss waterfall, where you will have the unique opportunity to walk behind the cascading water, feeling the cool mist on your face. Next, you will visit the powerful Skógafoss waterfall, one of Iceland wis largest, where rainbows often form in the mist.",
            // "After soaking in the beauty of these natural wonders, the tour continues to the majestic Sólheimajökull glacier. Here, you will embark on an unforgettable journey into a hidden ice cave, a rare and magical experience. The intricate ice formations and vibrant blue hues within the cave create a surreal atmosphere, perfect for capturing stunning photographs."

            `PostDetail your journey begins, you will be greeted by your experienced guide, who will share fascinating insights about Iceland is natural wonders and cultural heritage. The adventure kicks off with a scenic drive along the iconic Ring Road, where you will witness breathtaking landscapes that range from towering glaciers to black sand beaches.
            Your first stop is the mesmerizing Seljalandsfoss waterfall, where you will have the unique opportunity to walk behind the cascading water, feeling the cool mist on your face. Next, you will visit the powerful Skógafoss waterfall, one of Iceland wis largest, where rainbows often form in the mist.
            After soaking in the beauty of these natural wonders, the tour continues to the majestic Sólheimajökull glacier. Here, you will embark on an unforgettable journey into a hidden ice cave, a rare and magical experience. The intricate ice formations and vibrant blue hues within the cave create a surreal atmosphere, perfect for capturing stunning photographs.`
        ]
    };
    return (
        <div>
            <Hero/>
            <Description sections={placeData.sections} />
            <Restaurantlist/>
          
        </div>
    )
}


export default Articles;