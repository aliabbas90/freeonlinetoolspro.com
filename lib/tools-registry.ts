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
  {
    name: "AI Text Humanizer",
    slug: "ai-humanizer",
    description: "Make AI-generated text sound natural and human-written. Works with ChatGPT, Claude, Gemini.",
    icon: "🤖",
    keywords: ["ai text humanizer", "humanize ai text", "bypass ai detection", "ai rewriter"],
    metaTitle: "Free AI Text Humanizer — Make AI Text Sound Human",
    metaDescription:
      "Make AI-generated text sound natural and human-written for free. Works with ChatGPT, Claude, Gemini. Choose tone: casual, professional, academic, creative.",
  },
  {
    name: "Rate My Portfolio",
    slug: "rate-my-portfolio",
    description: "Get instant AI feedback on your portfolio or resume. Score, strengths, and actionable tips.",
    icon: "📊",
    keywords: ["rate my portfolio", "portfolio review", "resume review ai", "portfolio feedback"],
    metaTitle: "Rate My Portfolio & Resume — Free AI Review",
    metaDescription:
      "Get instant AI feedback on your portfolio or resume for free. Get a score, strengths, weaknesses, and actionable improvement tips.",
  },
  {
    name: "Daily Horoscope & Astrology",
    slug: "horoscope",
    description: "Daily horoscope, zodiac compatibility, and birth chart. AI-powered astrology in 3 languages.",
    icon: "🔮",
    keywords: ["daily horoscope", "zodiac compatibility", "birth chart", "horoscope du jour", "astrology"],
    metaTitle: "Free Daily Horoscope, Zodiac Compatibility & Birth Chart",
    metaDescription:
      "Get your free daily horoscope, zodiac compatibility, and birth chart reading. AI-powered astrology in English, French, and Spanish.",
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes.",
    icon: "🎂",
    keywords: ["age calculator", "how old am i", "calculate age", "birthday calculator"],
    metaTitle: "Free Age Calculator — How Old Am I?",
    metaDescription: "Calculate your exact age in years, months, days, hours, and minutes. Free age calculator. Just enter your birthday.",
  },
  {
    name: "Emoji Picker",
    slug: "emoji-picker",
    description: "Search, browse, and copy emojis with one click. All emojis categorized.",
    icon: "😀",
    keywords: ["emoji picker", "emoji copy paste", "emoji keyboard", "emoji list"],
    metaTitle: "Free Emoji Picker — Copy & Paste Emojis",
    metaDescription: "Browse, search, and copy emojis with one click. All emojis organized by category. Free emoji picker online.",
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum",
    description: "Generate placeholder text for your designs. Paragraphs, sentences, or words.",
    icon: "📄",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator"],
    metaTitle: "Free Lorem Ipsum Generator Online",
    metaDescription: "Generate lorem ipsum placeholder text for free. Choose paragraphs, sentences, or words. Copy with one click.",
  },
  {
    name: "Hashtag Generator",
    slug: "hashtag-generator",
    description: "Generate trending hashtags for Instagram, TikTok, Twitter. Boost your reach.",
    icon: "#️⃣",
    keywords: ["hashtag generator", "instagram hashtags", "tiktok hashtags", "trending hashtags"],
    metaTitle: "Free Hashtag Generator for Instagram, TikTok & Twitter",
    metaDescription: "Generate trending hashtags for Instagram, TikTok, and Twitter. Boost your social media reach. Copy hashtags with one click.",
  },
  {
    name: "Unit Converter",
    slug: "unit-converter",
    description: "Convert units: length, weight, temperature, speed, data, and more.",
    icon: "📏",
    keywords: ["unit converter", "convert units", "measurement converter", "kg to lbs", "celsius to fahrenheit"],
    metaTitle: "Free Unit Converter — Length, Weight, Temperature & More",
    metaDescription: "Convert between units for free. Length, weight, temperature, speed, data storage and more. Fast and easy unit converter.",
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test and debug regular expressions in real-time. See matches highlighted.",
    icon: "🔍",
    keywords: ["regex tester", "regex101", "regular expression tester", "regex debugger"],
    metaTitle: "Free Regex Tester & Debugger Online",
    metaDescription: "Test and debug regular expressions in real-time for free. See matches highlighted instantly. Supports JavaScript regex.",
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    description: "Convert Unix timestamps to human dates and back. Current timestamp included.",
    icon: "⏱️",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "date to timestamp"],
    metaTitle: "Free Unix Timestamp Converter Online",
    metaDescription: "Convert Unix timestamps to human-readable dates and back. Get the current timestamp. Free online epoch converter.",
  },
  {
    name: "Screen Info",
    slug: "screen-info",
    description: "Check your screen resolution, browser info, device pixel ratio, and more.",
    icon: "🖥️",
    keywords: ["screen resolution checker", "what is my screen size", "browser info", "device info"],
    metaTitle: "Free Screen Resolution & Browser Info Checker",
    metaDescription: "Check your screen resolution, browser info, device pixel ratio, viewport size and more. Free online screen info tool.",
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, HSL. Preview colors in real-time.",
    icon: "🎯",
    keywords: ["hex to rgb", "rgb to hex", "color converter", "hsl converter"],
    metaTitle: "Free Color Converter — HEX, RGB, HSL",
    metaDescription: "Convert colors between HEX, RGB, and HSL for free. Preview colors in real-time. Copy values with one click.",
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    description: "Calculate tips and split bills easily. Perfect for restaurants and group dining.",
    icon: "💵",
    keywords: ["tip calculator", "split bill calculator", "restaurant tip calculator", "how much to tip"],
    metaTitle: "Free Tip Calculator — Split Bills & Calculate Tips",
    metaDescription: "Calculate tips and split bills for free. Choose tip percentage, split between people. Perfect for restaurants.",
  },
];
