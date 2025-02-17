import FaqSection from "./components/FAQ's/faq";
import Feedback from "./components/Feedback/Feedback";
import Hero from "./components/Hero/HeroSection";
import MemorablePlace from "./components/MemorablePlace/MemorablePlace";
import Post from "./components/BestOfNewYork/Post"
import Feature from "./components/Featured/Feature";

export default function Home() {
  return (
    <div>
      <Hero />
      <Post />
      <Feature />
      <MemorablePlace />
      <Feedback />
      <FaqSection />
    </div>
  );
}
