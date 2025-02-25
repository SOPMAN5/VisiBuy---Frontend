import CTA from "../ui/CTA";
import CtaForm from "../ui/CtaForm";

// import Footer from "../ui/Footer";
// import Header from "../ui/Header";

import Hero from "../ui/Hero";
import ServicesManagement from "../ui/ServicesManagement";
import ServicesTray from "../ui/ServicesTray";
import Testimonials from "../ui/Testimonials";
import ProductSkeleton from "../ui/ProductSkeleton";


function Home() {
	return (
		<>
			<Hero />
			<ServicesTray />
			<ProductSkeleton/>
			{/* <CtaForm /> */}
			<ServicesManagement />
			<Testimonials />
			<CTA />
		</>
	);
}

export default Home;
