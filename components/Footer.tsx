"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-6 inline-flex flex-col items-center">
              <Image
                src="/newlogo.png"
                alt="DAS Healthcare Logo"
                width={80}
                height={80}
                className="w-auto h-12 object-contain"
              />
              <div className="flex flex-col items-center mt-1.5 w-max">
                <span className="text-blue-900 font-black text-5xl leading-none tracking-[0.1em]">
                  DAS
                </span>
                <span className="text-blue-800 text-[0.75rem] font-bold leading-none tracking-tight mt-1.5 w-full text-center">
                  HEALTHCARE PROVIDERS
                </span>
              </div>
            </Link>
            <p className="text-gray-600 max-w-md mb-6">
              Dedicated to providing compassionate care and support, empowering
              lives through domiciliary services.
            </p>
            <div className="flex items-center space-x-6 mb-6">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-400 transition-colors"
                aria-label="X"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} DAS Healthcare Providers. All rights
              reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                9, Arcus Road, Bromley, Kent, BR1 4NN, UK.
                <br />
                Service Provider: Personal Care.
              </li>
              <li className="flex flex-col gap-1">
                <a
                  href="tel:02036216242"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  02036216242
                </a>
                <a
                  href="tel:07856914135"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Direct : 07856914135
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dashealthcare.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  admin@dascareproviders.com
                </a>
              </li>
            </ul>
            <motion.p
              animate={{
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm md:text-base font-medium text-blue-600 mt-4"
            >
              Developed By ABR Technologies
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
