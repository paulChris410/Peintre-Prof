import "./globals.css";

export const metadata = {
  title: "Aurelia Delacroix | Contemporary Painter & Colorist",
  description: "Portfolio of Aurelia Delacroix. Contemporary abstract and figurative painter working with French Ultramarine, Cadmium Yellow, Rose Madder, and Viridian Green on traditional cool gesso grounds. Interactive 3D canvas studio, motion frames, and museum archive.",
  keywords: ["Aurelia Delacroix", "contemporary painter", "fine art portfolio", "oil on linen", "gouache", "large scale paintings", "ultramarine", "cadmium yellow", "rose madder", "viridian green", "3D canvas", "motion frame", "next.js portfolio"],
  authors: [{ name: "Aurelia Delacroix Studio" }],
  openGraph: {
    title: "Aurelia Delacroix | Contemporary Painter & Colorist",
    description: "Museum-grade fine art portfolio and 3D interactive exhibition engine.",
    images: [{ url: "/images/work-oil-horizon.jpg", width: 1200, height: 900, alt: "The Deep Horizon by Aurelia Delacroix" }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..800;1,300..800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
