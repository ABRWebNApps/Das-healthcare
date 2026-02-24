"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState<string | null>(null);
  const pathnameFromHook = usePathname();

  // Prevent hydration mismatch by setting pathname only on client
  useEffect(() => {
    setPathname(pathnameFromHook);
  }, [pathnameFromHook]);

  return (
    <nav
      className="w-full flex flex-col bg-sky-50 shadow-sm"
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex flex-col items-center justify-center"
        >
          <Image
            src="/newlogo.png"
            alt="DAS Healthcare Logo"
            width={60}
            height={60}
            className="w-auto h-10 object-contain"
            priority
          />
          <div className="flex flex-col items-center mt-1 w-max">
            <span className="text-blue-900 font-black text-4xl leading-none tracking-[0.1em]">
              DAS
            </span>
            <span className="text-blue-800 text-[0.55rem] font-bold leading-none tracking-tight mt-1 w-full text-center">
              HEALTHCARE PROVIDERS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              } transition-colors`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${
                pathname === "/about"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              } transition-colors`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={`${
                pathname === "/services"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              } transition-colors`}
            >
              Our Services
            </Link>
          </li>
          <li>
            <Link
              href="/approach"
              className={`${
                pathname === "/approach"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              } transition-colors`}
            >
              Our Approach
            </Link>
          </li>
          <li>
            <Link
              href="/families"
              className={`${
                pathname === "/families"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              } transition-colors`}
            >
              For Families
            </Link>
          </li>
          <li>
            <Link
              href="/careers"
              className={`${
                pathname === "/careers"
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500"
              } transition-colors`}
            >
              Careers
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Desktop Button (UPDATED) */}
          <Link
            href="/contact"
            className="hidden md:block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-200 transition-colors"
          >
            Request a Care Assessment
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-sky-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-[calc(100vh-76px)] border-t border-gray-100"
            : "max-h-0"
        }`}
      >
        <div className="py-4 px-4">
          <ul className="flex flex-col space-y-4 text-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 ${
                  pathname === "/"
                    ? "text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 ${
                  pathname === "/about"
                    ? "text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={`block py-2 ${
                  pathname === "/services"
                    ? "text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/approach"
                className={`block py-2 ${
                  pathname === "/approach"
                    ? "text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Approach
              </Link>
            </li>
            <li>
              <Link
                href="/families"
                className={`block py-2 ${
                  pathname === "/families"
                    ? "text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                For Families
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className={`block py-2 ${
                  pathname === "/careers"
                    ? "text-blue-500"
                    : "text-gray-700 hover:text-blue-500"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link>
            </li>

            {/* Mobile Button (UPDATED) */}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full block bg-blue-100 text-blue-700 px-4 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors text-lg text-center"
              >
                Request a Care Assessment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
