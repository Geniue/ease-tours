import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/logo-white.png"
              alt="Ease Travel"
              width={100}
              height={100}
              className="h-14 w-auto object-contain mb-2 brightness-0 invert"
            />
            <p className="text-sm text-gray-400 leading-snug">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="hover:text-white transition-colors"
                >
                  {nav("tours")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t("contactUs")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:easetravel93@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={16} />
                  easetravel93@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+201105001389" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={16} />
                  +20 11 05001389
                </a>
              </li>
              <li>
                <a href="https://wa.me/201105001389" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61587378845962"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Ease Travel. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
