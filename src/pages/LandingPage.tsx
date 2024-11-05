import { ArrowRight, BarChart3, MessageSquare, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import landing from "../assets/landing.jpeg";
import landing2 from "../assets/score.jpeg";
import landing3 from "../assets/report.jpeg";
import {
  SiApple,
  SiNetflix,
  SiShazam,
  SiSlack,
  SiWordpress,
} from "react-icons/si";
import one from "../assets/one.jpeg";
import two from "../assets/two.jpeg";
import three from "../assets/three.jpeg";
export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
      <main className="container mx-auto px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between ">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="badge">BEST SOFTWARE SERVICE</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transform Your Credit Management
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              Take control of your credit repair process with secure,
              transparent document management and advanced analytics. We offer
              the best services to help you manage your credit repair with ease
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 primary-btn">Get Started</button>
              <button className="px-6 py-3 secondary-btn">Explore More</button>
            </div>
          </div>
          <div className="md:w-1/2  ">
            <img
              src={landing}
              // src="https://www.notion.so/cdn-cgi/image/format=webp,width=1080/https://images.ctfassets.net/spoqsaf9291f/1r1qxm7ecF3v8dgX4hdmgu/b719878969ec4683dab0c8600c20f836/illustration.png"
              alt="Analytics Dashboard"
              className="float-right w-[37rem] h-full "
            />
          </div>
        </div>

        <div className="mt-24">
          <p className="text-center font-bold text-gray-500 mb-2">
            We are trusted by
          </p>
          <p className="text-center w-2/3 mx-auto  text-gray-600 mb-12">
            Trusted by industry leaders for secure and reliable credit repair
            services
          </p>
          <div className="flex flex-wrap justify-evenly items-center gap-8">
            {[
              <SiNetflix />,
              <SiSlack />,
              <SiShazam />,
              <SiApple />,
              <SiWordpress />,
            ].map((brand) => (
              <div key={brand} className="text-gray-500 text-5xl font-bold">
                {brand}
              </div>
            ))}
          </div>
        </div>
        {/* Features */}
        <div className="mt-20">
          <div className="badge mx-auto py-2">Features</div>
          <h2 className="text-5xl my-6 font-bold text-center ">
            Most essential features
          </h2>
          <p className="text-center w-2/3 mx-auto  text-gray-600 mb-12">
            Our platform is adaptable to your needs, whether you’re managing
            personal credit or working on behalf of clients
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">
                  Flexible Credit Repair Solutions
                </h3>
                <ArrowRight className="text-black   -rotate-45 " />
              </div>
              <p className=" text-sm mx-auto  text-gray-500 mb-3">
                Our platform is adaptable to your needs, whether you’re managing
                personal credit or working on behalf of clients
              </p>
              <img src={one} className="w-full rounded-lg mb-4" />
            </div>
            <div className="bg-orange-100 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  Secure Document Storage
                </h3>
                <ArrowRight className="text-orange-600   -rotate-45 " />
              </div>
              <p className=" text-sm mx-auto  text-gray-500 mb-3">
                Store all your documents securely in one place. Never worry
                about losing track of critical paperwork again
              </p>
              <img src={two} className="w-full rounded-lg mb-4" />
            </div>
            <div className="bg-purple-100 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  Advanced Credit Analytics
                </h3>
                <ArrowRight className="text-purple-600   -rotate-45 " />
              </div>
              <p className=" text-sm mx-auto  text-gray-500 mb-3">
                Gain insights into your credit repair journey with the latest
                data and trends to track your progress.
              </p>
              <img
                src={three}
                alt="Latest Analytics"
                className="w-full rounded-lg mb-4"
              />
            </div>
          </div>
        </div>
        {/* Service flow */}
        <div className="mt-36 grid grid-cols-1 md:grid-cols-2 gap-14">
          <img src={landing2} className="w-full" alt="" />
          <div className="flex flex-col justify-center">
            <div className="badge">Service Flow</div>
            <h2 className="text-4xl  my-4 font-bold">
              A Streamlined Approach to Credit Repair
            </h2>
            <p className="text-gray-400 font-semibold mb-6">
              Our platform follows a simple and efficient flow to help you
              manage and improve credit effortlessly.” Call-to-Action Buttons
            </p>
            <div className="flex items-center">
              <button className="px-20 mr-6 py-3 primary-btn self-start">
                Discover Now
              </button>
              <div className="underline font-bold text-black cursor-pointer">
                Get Service
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="mt-36 grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="flex flex-col justify-center">
            <div className="badge">Performance</div>
            <h2 className="text-4xl leading-tight my-4 font-bold">
              Clients See Real Results with Our Performance
            </h2>
            <p className="text-gray-400 font-semibold mb-6">
              Our software is designed to deliver fast, effective credit repair
              results, leaving our clients satisfied with their improved credit
              scores
            </p>
            <div className="flex items-center">
              <button className="px-20 mr-6 py-3 primary-btn self-start">
                Learn More
              </button>
            </div>
          </div>
          <img src={landing3} className="w-full" alt="" />
        </div>
      </main>
      {/* Testimonials */}
      <div className="bg-[#F5F4FF] mt-36 flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="badge mx-auto">Testimonial</div>
          <h2 className="text-5xl font-bold my-4 text-gray-900">
            Have a look clients good
            <br />
            impression on us
          </h2>
          <p className="text-gray-600 mb-12">
            See how our clients rate our work
          </p>
          <div className=" w-full p-8 flex flex-col md:flex-row items-center text-left">
            <div className="mb-6 md:mb-0 md:mr-8 ">
              <img
                src="https://i.pravatar.cc/500?img=8
"
                alt="Client"
                className="w-[40rem] rounded-full object-cover"
              />
            </div>
            <div className="text-xl  space-y-5">
              <div className="border-l-4 pl-4 border-websitePrimary">
                <h3 className="font-bold text-gray-900">Nadal Pinch</h3>
                <p className="text-gray-600 font-normal text-sm">CEO, Google</p>
              </div>
              <p className="text-gray-500 font-semibold mb-4 ">
                It was a nice experience to work with "EyeCareAboutCredit". They
                are very co-operative and understand the task. I am very glad to
                have a good relation with them.
              </p>
              <div className="flex space-x-2 items-center ">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-7 h-7 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
