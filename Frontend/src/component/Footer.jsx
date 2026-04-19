import { Link } from "react-router";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <footer>
      <div className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-wrap justify-between gap-12 md:gap-6">

          {/* Logo Section */}
          <div className="max-w-80">
            {loading ? (
              <Skeleton height={30} width={120} />
            ) : (
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
                alt="logo"
                className="mb-4 h-8 md:h-9"
              />
            )}

            <p className="text-sm">
              {loading ? (
                <Skeleton count={3} />
              ) : (
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
              )}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {loading ? (
                <>
                  <Skeleton circle width={24} height={24} />
                  <Skeleton circle width={24} height={24} />
                  <Skeleton circle width={24} height={24} />
                  <Skeleton circle width={24} height={24} />
                </>
              ) : (
                <>
                  {/* Instagram */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                  {/* Facebook */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                  {/* Twitter */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                  {/* LinkedIn */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                </>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-lg text-gray-800">
              {loading ? <Skeleton width={100} /> : "COMPANY"}
            </p>

            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {loading
                ? Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} width={80} />
                  ))
                : (
                  <>
                    <li><Link to="#">About</Link></li>
                    <li><Link to="#">Careers</Link></li>
                    <li><Link to="#">Press</Link></li>
                    <li><Link to="#">Blog</Link></li>
                    <li><Link to="#">Partners</Link></li>
                  </>
                )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-lg text-gray-800">
              {loading ? <Skeleton width={100} /> : "SUPPORT"}
            </p>

            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {loading
                ? Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} width={100} />
                  ))
                : (
                  <>
                    <li><Link to="#">Help Center</Link></li>
                    <li><Link to="#">Safety Information</Link></li>
                    <li><Link to="#">Cancellation Options</Link></li>
                    <li><Link to="#">Contact Us</Link></li>
                    <li><Link to="#">Accessibility</Link></li>
                  </>
                )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="max-w-80">
            <p className="text-lg text-gray-800">
              {loading ? <Skeleton width={150} /> : "STAY UPDATED"}
            </p>

            <p className="mt-3 text-sm">
              {loading ? <Skeleton count={2} /> : "Subscribe to our newsletter for inspiration and special offers."}
            </p>

            <div className="flex items-center mt-4">
              {loading ? (
                <Skeleton height={36} width={200} />
              ) : (
                <>
                  <input
                    type="text"
                    className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
                    placeholder="Your email"
                  />
                  <button className="flex items-center justify-center bg-black h-9 w-9 rounded-r">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">...</svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-300 mt-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
          <p>
            {loading ? (
              <Skeleton width={250} />
            ) : (
              <>© {new Date().getFullYear()} <Link to="https://prebuiltui.com">PrebuiltUI</Link>. All rights reserved.</>
            )}
          </p>

          <ul className="flex items-center gap-4">
            {loading
              ? Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} width={60} />
                ))
              : (
                <>
                  <li><Link to="#">Privacy</Link></li>
                  <li><Link to="#">Terms</Link></li>
                  <li><Link to="#">Sitemap</Link></li>
                </>
              )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;