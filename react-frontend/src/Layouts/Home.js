import SEO from '../Components/Auth/Shared/SEO';
import AboutPlatform from '../Components/Home/AboutPlatform';
import Services from '../Components/Home/Services';

export default function Home() {
    return (
        <>
            <SEO
                title="Local Experts - Find Trusted Service Providers Near You"
                description="Discover and connect with top-rated local experts for all your service needs. Browse providers, read reviews, and get the job done right."
                url="https://yourdomain.com/"
                image="https://yourdomain.com/og-image.jpg"
            />
            <Services />
            <AboutPlatform />
        </> 
    )
}
