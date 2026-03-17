export interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export const tools: Tool[] = [
  {
    name: "QR Code Generator",
    slug: "qr-code",
    description: "Generate QR codes for URLs, text, WiFi, and more. Download as PNG instantly.",
    icon: "📱",
    keywords: ["qr code generator", "free qr code", "qr code maker"],
    metaTitle: "Free QR Code Generator Online",
    metaDescription:
      "Generate QR codes for free. Create QR codes for URLs, text, WiFi, email and more. Download as PNG instantly. No signup required.",
  },
  {
    name: "Image Resizer & Compressor",
    slug: "image-resize",
    description: "Resize and compress images online. Reduce file size without losing quality.",
    icon: "🖼️",
    keywords: ["image resizer", "compress image online", "resize image free"],
    metaTitle: "Free Image Resizer & Compressor Online",
    metaDescription:
      "Resize and compress images online for free. Reduce file size without losing quality. Supports PNG, JPG, WebP. No upload to server.",
  },
  {
    name: "Color Palette Extractor",
    slug: "color-palette",
    description: "Extract the dominant colors from any image. Get hex codes and copy with one click.",
    icon: "🎨",
    keywords: ["color palette from image", "extract colors", "color picker"],
    metaTitle: "Free Color Palette Extractor from Image",
    metaDescription:
      "Extract dominant colors from any image for free. Get hex codes, RGB values, and copy colors with one click. Perfect for designers.",
  },
  {
    name: "Text Tools",
    slug: "text-tools",
    description: "Word counter, character counter, case converter, and more text utilities.",
    icon: "📝",
    keywords: ["word counter", "character counter", "text case converter"],
    metaTitle: "Free Online Text Tools — Word Counter, Case Converter & More",
    metaDescription:
      "Free online text tools: word counter, character counter, uppercase/lowercase converter, slug generator, and more. No signup required.",
  },
  {
    name: "Favicon Generator",
    slug: "favicon-generator",
    description: "Generate favicons from text or emoji. Download as ICO and PNG for your website.",
    icon: "⭐",
    keywords: ["favicon generator", "favicon from text", "ico generator"],
    metaTitle: "Free Favicon Generator from Text & Emoji",
    metaDescription:
      "Generate favicons from text or emoji for free. Download as ICO and PNG. Perfect for websites and web apps. No signup required.",
  },
];
