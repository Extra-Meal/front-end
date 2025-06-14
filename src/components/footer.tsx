import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <div className="footer pt-[50px] pb-3 shadow-[0_-4px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="footer-content">
        <div className="logo relative flex justify-center px-10 pb-5">
          <svg width="196" height="50.50098037021091" viewBox="0 0 228.26005432875453 86" >
            <defs id="SvgjsDefs3416"></defs>
            <g
              id="SvgjsG3417"
              transform="matrix(2.3715414542992743,0,0,2.3715414542992743,-2.1343875350371646,18.569170914014514)"
              fill="var(--primary)"
            >
              <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z"></path>
            </g>
            <g
              id="SvgjsG3418"
              transform="matrix(2.412868620369486,0,0,2.412868620369486,145.69168892013258,17.74262874315569)"
              fill="var(--foreground)"
            >
              <path d="M4.34 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M10.92 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M27.580000000000002 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
            </g>
          </svg>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 md:grid-cols-4">
            <div className="about">
              <p className="text-foreground mb-3">
                Welcome to Mealify, where grocery shopping meets imagination! Browse tasty meals or pick fresh
                ingredients like a pro. It’s not just shopping. It’s food play, made easy.
              </p>
              <div className="social-media-icons">
                <ul className="flex gap-2">
                  <li className="bg-primary rounded-full p-2">
                    <FaFacebookF />
                  </li>
                  <li className="bg-primary rounded-full p-2">
                    <FaTwitter />
                  </li>
                  <li className="bg-primary rounded-full p-2">
                    <FaInstagram />
                  </li>
                  <li className="bg-primary rounded-full p-2">
                    <FaTiktok />
                  </li>
                </ul>
              </div>
            </div>
            <div className="links flex flex-col md:items-center">
              <h6 className="text-primary mb-2 font-bold">Quick Links</h6>
              <ul>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    Menu
                  </Link>
                </li>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    Ingredients
                  </Link>
                </li>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    Area
                  </Link>
                </li>
              </ul>
            </div>
            <div className="resources flex flex-col md:items-center">
              <h6 className="text-primary mb-2 font-bold">Resources</h6>
              <ul>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    About Us
                  </Link>
                </li>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="text-foreground mb-1 font-light">
                  <Link
                    to="/"
                    className="hover:text-primary after:bg-primary relative pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:content-[''] hover:after:scale-x-100"
                  >
                    Setting{" "}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="new">
              <h6 className="text-primary mb-2 font-bold">Newsletter</h6>
              <p className="text-foreground mb-4 font-light">
                Register your email to not miss any news and offers from us!
              </p>
              <div className="flex w-full max-w-sm items-center gap-2">
                <Input type="email" placeholder="Email Address..." />
                <Button type="submit">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright flex flex-wrap justify-between gap-2 py-3 md:flex-nowrap">
          <p>
            Copyright &copy; 2025 <span className="text-primary">Mealify</span>. All rights reserved
          </p>
          <div>
            <ul className="flex gap-2">
              <li className="text-foreground hover:text-primary border-r pr-2 font-light transition-all">
                Privacy Policy
              </li>
              <li className="text-foreground hover:text-primary font-light transition-all">Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    // <div className="footer pb-3 pt-[50px] px-[20px] md:px-[60px] lg:px-[100px] bg-secondary">
    //     <div className="container">
    //         <div className="footer-content">
    //         <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-y-7">
    //             <div className="links order-2  lg:order-1  border-0 lg:border-r-1 border-primary-foreground">
    //                 <h6 className="mb-5 md:mb-8 pb-3 text-xl md:text-3xl text-primary-foreground font-bold relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-15 before:h-[3px] before:bg-primary">Quick Links</h6>
    //                 <ul>
    //                     <li className="mb-1 font-light text-foreground ">
    //                         <Link to="/" className="md:text-xl text-primary-foreground transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:bg-primary-foreground after:transition-transform pb-1">Home</Link>
    //                     </li>
    //                     <li className="mb-1 font-light text-foreground">
    //                         <Link to="/" className="md:text-xl text-primary-foreground transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:bg-primary-foreground after:transition-transform pb-1" >Menu</Link>
    //                     </li>
    //                     <li className="mb-1 font-light text-foreground">
    //                         <Link to="/" className="md:text-xl text-primary-foreground transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:bg-primary-foreground after:transition-transform pb-1" >Ingredients</Link>
    //                     </li>
    //                     <li className="mb-1 font-light text-foreground">
    //                         <Link to="/" className="md:text-xl text-primary-foreground transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:bg-primary-foreground after:transition-transform pb-1" >Categories</Link>
    //                     </li>
    //                     <li className="mb-1 font-light text-foreground">
    //                         <Link to="/" className="md:text-xl text-primary-foreground transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:bg-primary-foreground after:transition-transform pb-1" >Area</Link>
    //                     </li>

    //                 </ul>
    //             </div>
    //             <div className="logo-section order-1 lg:order-2 md:col-span-2 lg:col-span-1  border-0 lg:border-r-1 border-primary-foreground md:px-7 flex flex-col items-center">
    //                 <div className="logo-icon mb-2">
    //                     <svg width="229" height="76.3479156172928" viewBox="0 0 367.5 91.10223540642215" class="looka-1j8o68f">
    //                         <defs id="SvgjsDefs2295"></defs>
    //                         <g id="SvgjsG2296" featurekey="textGroupContainer" transform="matrix(1,0,0,1,0,10)" fill="var(--primary)">
    //                             <rect xmlns="http://www.w3.org/2000/svg" y="0" x="0" height="1" width="1" opacity="0"></rect>
    //                             <rect xmlns="http://www.w3.org/2000/svg" y="69.875" x="0" width="35" height="2"></rect>
    //                             <rect xmlns="http://www.w3.org/2000/svg" y="69.875" x="332.5" width="35" height="2"></rect>
    //                         </g>
    //                         <g id="SvgjsG2297" featurekey="nameFeature-0" transform="matrix(3.6008231583214014,0,0,3.6008231583214014,5.759258814109483,-17.355966524225135)" fill="var(--primary)">
    //                             <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z M68.22 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M74.8 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M91.46000000000001 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
    //                         </g>
    //                         <g id="SvgjsG2298" featurekey="sloganFeature-0" transform="matrix(1.1182108217351205,0,0,1.1182108217351205,43.77635804893477,68.51437808706345)" fill="#ffffff">
    //                             <path d="M6.1 7.300000000000001 l0 12.7 l-1.5 0 l0 -12.7 l-4.4 0 l0 -1.3 l10.3 0 l0 0.9 l-0.4 0.4 l-4 0 z M21.1 6 l1.5 0 l0 14 l-1.5 0 l0 -6.5 l-6.9 0 l0 6.5 l-1.5 0 l0 -14 l1.5 0 l0 6.2 l6.9 0 l0 -6.2 z M28.1 20 l-1.5 0 l0 -14 l1.5 0 l0 14 z M40.3 20 l-6.8 -11.5 l-0.1 0 l0.2 2.6 l0 8.9 l-1.5 0 l0 -14 l1.6 0 l6.8 11.5 l0.1 0 l-0.2 -2.6 l0 -8.9 l1.5 0 l0 14 l-1.6 0 z M47.400000000000006 6 l0 6.2 l3.3 0 l3.4 -6.2 l1.5 0 l0 0.6 l-3.7 6.2 l3.9 6.6 l0 0.6 l-1.5 0 l-3.6 -6.5 l-3.3 0 l0 6.5 l-1.5 0 l0 -14 l1.5 0 z M64.7 20 l-1.5 0 l0 -14 l1.5 0 l0 14 z M72.8 7.300000000000001 l0 12.7 l-1.5 0 l0 -12.7 l-4.4 0 l0 -1.3 l10.3 0 l0 0.9 l-0.4 0.4 l-4 0 z M78.60000000000001 18.1 l1.5 0 l0 1.9 l-1.5 0 l0 -1.9 z M97.00000000000001 18.7 l0 1.3 l-5.8 0 c-2.1 0 -3.5 -1.4 -3.5 -3.3 l0 -7.4 c0 -1.9 1.4 -3.3 3.5 -3.3 l5.8 0 l0 0.9 l-0.4 0.4 l-5.4 0 c-1.1 0 -2 0.9 -2 2 l0 7.4 c0 1.1 0.9 2 2 2 l5.8 0 z M101.2 20 l-1.5 0 l0 -14 l6.2 0 c2.1 0 3.5 1.4 3.5 3.3 l0 1.9 c0 2.8 -2.7 3.2 -2.7 3.2 l3.1 5 l0 0.6 l-1.5 0 l-3.1 -5.5 l-4 0 l0 5.5 z M105.9 7.300000000000001 l-4.7 0 l0 5.9 l4.7 0 c1.1 0 2 -0.9 2 -2 l0 -1.9 c0 -1.1 -0.9 -2 -2 -2 z M113.8 16.4 l-1.2 3.6 l-1.5 0 l0 -0.6 l4.9 -13.4 l1.7 0 l4.9 13.4 l0 0.6 l-1.5 0 l-1.2 -3.6 l-6.1 0 z M119.39999999999999 15.1 l-2.5 -7.3 l-0.1 0 l-2.5 7.3 l5.1 0 z M128.1 18.2 l0.1 0 l4 -12.2 l1.5 0 l0 0.6 l-4.6 13.4 l-1.9 0 l-4.6 -13.4 l0 -0.6 l1.5 0 z M136 20 l0 -14 l9.1 0 l0 0.9 l-0.4 0.4 l-7.2 0 l0 4.9 l5.7 0 l0 1.3 l-5.7 0 l0 5.2 l7.6 0 l0 1.3 l-9.1 0 z M154 20 l-1.5 0 l0 -14 l1.5 0 l0 14 z M162.1 7.300000000000001 l0 12.7 l-1.5 0 l0 -12.7 l-4.4 0 l0 -1.3 l10.3 0 l0 0.9 l-0.4 0.4 l-4 0 z M167.89999999999998 18.1 l1.5 0 l0 1.9 l-1.5 0 l0 -1.9 z M186.3 18.7 l0 1.3 l-5.8 0 c-2.1 0 -3.5 -1.4 -3.5 -3.3 l0 -7.4 c0 -1.9 1.4 -3.3 3.5 -3.3 l5.8 0 l0 0.9 l-0.4 0.4 l-5.4 0 c-1.1 0 -2 0.9 -2 2 l0 7.4 c0 1.1 0.9 2 2 2 l5.8 0 z M188.6 16.9 l0 -7.8 c0 -1.9 1.4 -3.3 3.5 -3.3 l3.5 0 c2.1 0 3.5 1.4 3.5 3.3 l0 7.8 c0 1.9 -1.4 3.3 -3.5 3.3 l-3.5 0 c-2.1 0 -3.5 -1.4 -3.5 -3.3 z M197.6 16.9 l0 -7.8 c0 -1.1 -0.9 -2 -2 -2 l-3.5 0 c-1.1 0 -2 0.9 -2 2 l0 7.8 c0 1.1 0.9 2 2 2 l3.5 0 c1.1 0 2 -0.9 2 -2 z M202.29999999999998 16.9 l0 -7.8 c0 -1.9 1.4 -3.3 3.5 -3.3 l3.5 0 c2.1 0 3.5 1.4 3.5 3.3 l0 7.8 c0 1.9 -1.4 3.3 -3.5 3.3 l-3.5 0 c-2.1 0 -3.5 -1.4 -3.5 -3.3 z M211.29999999999998 16.9 l0 -7.8 c0 -1.1 -0.9 -2 -2 -2 l-3.5 0 c-1.1 0 -2 0.9 -2 2 l0 7.8 c0 1.1 0.9 2 2 2 l3.5 0 c1.1 0 2 -0.9 2 -2 z M217.89999999999998 6 l0 6.2 l3.3 0 l3.4 -6.2 l1.5 0 l0 0.6 l-3.7 6.2 l3.9 6.6 l0 0.6 l-1.5 0 l-3.6 -6.5 l-3.3 0 l0 6.5 l-1.5 0 l0 -14 l1.5 0 z M235.2 20 l-1.5 0 l0 -14 l1.5 0 l0 14 z M243.29999999999998 7.300000000000001 l0 12.7 l-1.5 0 l0 -12.7 l-4.4 0 l0 -1.3 l10.3 0 l0 0.9 l-0.4 0.4 l-4 0 z M249.09999999999997 18.1 l1.5 0 l0 1.9 l-1.5 0 l0 -1.9 z">
    //                             </path>
    //                         </g>
    //                     </svg>
    //                 </div>
    //                 <p className="mb-3 text-primary-foreground text-center">
    //                          Welcome to Mealify, where grocery shopping meets imagination! Browse tasty meals or pick fresh ingredients like a pro.
    //                            It’s not just shopping. It’s food play, made easy.
    //                 </p>
    //                 <div className="social-media-icons">
    //                          <ul className="flex gap-2">
    //                              <li className="p-3 border-2 border-primary rounded-full ">
    //                                <FaFacebookF className="text-primary-foreground"/>
    //                              </li>
    //                              <li className="p-3 border-2 border-primary rounded-full">
    //                                <FaTwitter className="text-primary-foreground"/>
    //                              </li>
    //                              <li className="p-3 border-2 border-primary rounded-full">
    //                                <FaInstagram className="text-primary-foreground"/>
    //                              </li>
    //                              <li className="p-3 border-2 border-primary rounded-full">
    //                                <FaTiktok className="text-primary-foreground"/>
    //                              </li>
    //                          </ul>
    //                 </div>
    //             </div>
    //             <div className="contact order-3  lg:order-3  px-0 md:px-7">
    //                 <h6 className="mb-5 md:mb-8 pb-3 text-xl md:text-3xl text-primary-foreground font-bold text-start md:text-end relative before:content-[''] before:absolute before:bottom-0 before:left-0 md:before:left-auto md:before:right-0 before:w-15 before:h-[3px] before:bg-primary">Contact Us</h6>
    //                 <ul >
    //                     <li className="mb-1 md:text-xl font-light text-primary-foreground text-start md:text-end">1901 Thornridge Cir. Shiloh, Hawaii 81063</li>
    //                     <li className="mb-1 md:text-xl font-light text-primary-foreground text-start md:text-end">+88-344-667-999</li>
    //                     <li className="mb-1 md:text-xl font-light text-primary-foreground text-start md:text-end">Mealify@ITI.com</li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    //     </div>
    //     <div className="container ">
    //         <div className="copyright  flex justify-between flex-wrap md:flex-nowrap gap-2">
    //               <p className="font-light text-sm md:text-md text-primary-foreground">Copyright &copy; 2025 Mealify. All rights reserved</p>
    //                 <div>
    //                      <ul className="flex gap-2">
    //                          <li className="font-light text-sm md:text-md text-primary-foreground border-r pr-2 transition-all hover:text-primary">Privacy Policy</li>
    //                          <li className="font-light text-sm md:text-md text-primary-foreground transition-all hover:text-primary">Terms & Conditions</li>
    //                      </ul>
    //                  </div>
    //         </div>
    //     </div>
    // </div>
  );
}
