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
  {
    name: "Password Generator",
    slug: "password-generator",
    description: "Generate strong, secure passwords instantly. Customize length, symbols, and more.",
    icon: "🔐",
    keywords: ["password generator", "random password", "strong password generator"],
    metaTitle: "Free Password Generator — Strong & Secure",
    metaDescription:
      "Generate strong, secure passwords for free. Customize length, include symbols, numbers, uppercase. Copy with one click. No data stored.",
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Format, validate, and minify JSON data. Syntax highlighting and error detection.",
    icon: "📋",
    keywords: ["json formatter", "json validator", "json beautifier"],
    metaTitle: "Free JSON Formatter & Validator Online",
    metaDescription:
      "Format, validate, and beautify JSON data online for free. Syntax highlighting, error detection, minify and copy. No signup required.",
  },
  {
    name: "CSS Gradient Generator",
    slug: "css-gradient",
    description: "Create beautiful CSS gradients visually. Copy the CSS code with one click.",
    icon: "🌈",
    keywords: ["css gradient generator", "gradient maker", "css gradient"],
    metaTitle: "Free CSS Gradient Generator Online",
    metaDescription:
      "Create beautiful CSS gradients visually for free. Linear and radial gradients. Copy CSS code with one click. Perfect for web designers.",
  },
  {
    name: "Base64 Encoder/Decoder",
    slug: "base64",
    description: "Encode or decode Base64 strings instantly. Supports text and file encoding.",
    icon: "🔄",
    keywords: ["base64 encode", "base64 decode", "base64 converter"],
    metaTitle: "Free Base64 Encoder & Decoder Online",
    metaDescription:
      "Encode and decode Base64 strings online for free. Convert text to Base64 and back instantly. No signup required.",
  },
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description: "Generate SEO meta tags for your website. Preview how your page looks on Google.",
    icon: "🏷️",
    keywords: ["meta tag generator", "seo meta tags", "og tag generator"],
    metaTitle: "Free Meta Tag Generator for SEO",
    metaDescription:
      "Generate SEO meta tags for your website for free. Open Graph, Twitter cards, and more. Preview your Google search result. No signup required.",
  },
  {
    name: "Smart Deal Finder",
    slug: "deal-finder",
    description: "Find the best deals and cheaper alternatives for any product. Compare prices across stores.",
    icon: "💰",
    keywords: ["find cheaper alternative", "price comparison", "best deal finder", "dupe finder"],
    metaTitle: "Free Deal Finder — Find Cheaper Alternatives for Any Product",
    metaDescription:
      "Find the best deals and cheaper alternatives for any product. Compare prices across Amazon, AliExpress, eBay and more. Save money instantly.",
  },
  {
    name: "Invoice Generator",
    slug: "invoice-generator",
    description: "Create professional invoices for free. Download as PDF instantly. No signup needed.",
    icon: "🧾",
    keywords: ["free invoice generator", "invoice maker", "create invoice online"],
    metaTitle: "Free Invoice Generator Online — Create & Download PDF",
    metaDescription:
      "Create professional invoices for free. Add items, taxes, discounts. Download as PDF instantly. No signup required. Perfect for freelancers.",
  },
  {
    name: "YouTube Thumbnail Downloader",
    slug: "youtube-thumbnail",
    description: "Download YouTube video thumbnails in all sizes. Just paste the video URL.",
    icon: "▶️",
    keywords: ["youtube thumbnail downloader", "youtube thumbnail grabber", "yt thumbnail download"],
    metaTitle: "Free YouTube Thumbnail Downloader — All Sizes",
    metaDescription:
      "Download YouTube video thumbnails in HD, SD, and all sizes for free. Just paste the video URL. No signup required.",
  },
  {
    name: "Markdown Editor",
    slug: "markdown-editor",
    description: "Write and preview Markdown in real-time. Export to HTML. Free online editor.",
    icon: "✍️",
    keywords: ["markdown editor online", "markdown preview", "markdown to html"],
    metaTitle: "Free Online Markdown Editor with Live Preview",
    metaDescription:
      "Write and preview Markdown in real-time for free. Export to HTML. Supports tables, code blocks, images and more. No signup required.",
  },
  {
    name: "URL Encoder/Decoder",
    slug: "url-encoder",
    description: "Encode or decode URLs instantly. Handle special characters in URLs with ease.",
    icon: "🔗",
    keywords: ["url encoder", "url decoder", "percent encoding"],
    metaTitle: "Free URL Encoder & Decoder Online",
    metaDescription:
      "Encode and decode URLs online for free. Handle special characters, percent encoding, and query strings instantly. No signup required.",
  },
];
