import { Outfit, Ovo  } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ['latin'], weight: ["400", "500", "600", "700"] 
});

const ovo = Ovo({
   subsets: ['latin'], weight: ["400"] 
  });


export const metadata = {
  title: "Portfolio - Dostindev",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="transition-colors duration-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}

