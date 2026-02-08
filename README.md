# Pulse PDF Converter

A modern, web-based text to PDF converter built with Next.js, TypeScript, and jsPDF. Convert your plain text into professionally formatted PDF documents with ease.

![PDF Converter](./public/converter-preview.png)

## Features

- 🎨 **Modern UI** - Clean interface built with shadcn/ui components
- 📄 **Simple Conversion** - Paste text and generate PDF instantly
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Fast** - Instant PDF generation in the browser
- 💾 **Auto Download** - PDFs download automatically
- 🎯 **Custom Naming** - Name your PDF files before generation

## Tech Stack

- **Framework**: Next.js 16.1.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PulseDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the cleanup script (removes unnecessary template files):
```bash
./cleanup.sh
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Usage

### Basic Usage

1. Navigate to the dashboard at `/dashboard`
2. Enter a name for your PDF file
3. Paste or type your text in the text area
4. Click "Generate PDF"
5. Your PDF will automatically download

### Advanced Features

#### Markdown Support
Use simple markdown formatting:

```
# Large Title
## Heading
Regular paragraph text
```

To enable markdown, update the page to use `generatePDFFromMarkdown()`.

#### Custom Formatting
Modify PDF appearance programmatically:

```typescript
import { generatePDF } from "@/lib/pdf-generator"

await generatePDF(text, fileName, {
  fontSize: 14,
  lineHeight: 1.8,
  marginLeft: 25,
  marginRight: 25,
  fontFamily: "times"
})
```

## Project Structure

```
PulsePDF/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   └── page.tsx        # PDF Converter page
│   │   ├── globals.css
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── layouts/            # Layout components
│   │   ├── shared/             # Shared components
│   │   └── ui/                 # UI components
│   ├── lib/
│   │   ├── utils.ts
│   │   └── pdf-generator.ts    # PDF generation logic
│   └── hooks/
│       └── use-mobile.ts
├── public/                     # Static assets
├── cleanup.sh                  # Cleanup script
├── SETUP_GUIDE.md             # Detailed setup guide
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## PDF Generation API

### `generatePDF(text, fileName, options)`
Basic text to PDF conversion.

**Parameters:**
- `text` (string) - The text to convert
- `fileName` (string) - Name of the PDF file (without .pdf)
- `options` (object) - Optional formatting options
  - `fontSize` (number) - Font size in points (default: 12)
  - `lineHeight` (number) - Line height multiplier (default: 1.5)
  - `marginLeft` (number) - Left margin in mm (default: 20)
  - `marginRight` (number) - Right margin in mm (default: 20)
  - `marginTop` (number) - Top margin in mm (default: 20)
  - `marginBottom` (number) - Bottom margin in mm (default: 20)
  - `fontFamily` (string) - Font family: "helvetica", "times", or "courier"

### `generateFormattedPDF(sections, fileName)`
Create PDFs with multiple sections and different formatting.

**Parameters:**
- `sections` (array) - Array of section objects
  - `text` (string) - Section text
  - `type` (string) - "title", "heading", or "body"
  - `fontSize` (number) - Optional custom font size
  - `bold` (boolean) - Whether to use bold font
- `fileName` (string) - Name of the PDF file

### `generatePDFFromMarkdown(text, fileName)`
Parse markdown-like syntax and create formatted PDF.

**Supported Markdown:**
- `# Title` - Large title text
- `## Heading` - Heading text
- Regular text - Body text

## Customization

### Changing Default Settings

Edit `/src/lib/pdf-generator.ts` to change default PDF settings:

```typescript
const {
  fontSize = 12,        // Change default font size
  lineHeight = 1.5,     // Change line spacing
  marginLeft = 20,      // Adjust margins
  // ...
} = options
```

### Adding New Features

1. **Text Formatting**: Add bold, italic, underline buttons
2. **Color Support**: Allow users to change text color
3. **Page Orientation**: Support landscape mode
4. **Multiple Pages**: Better multi-page document support
5. **Templates**: Pre-defined document templates

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Connect repository and deploy
- **AWS Amplify**: Configure build settings
- **DigitalOcean**: Use App Platform

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## Troubleshooting

### PDF Not Downloading
- Check browser download settings
- Disable pop-up blockers
- Try a different browser

### Text Formatting Issues
- Reduce font size for long text
- Increase margins
- Break long words with hyphens

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- PDF generation powered by [jsPDF](https://github.com/parallax/jsPDF)
- Icons by [Lucide](https://lucide.dev/)

## Support

For support, please open an issue in the repository or contact the maintainers.

---

Made with ❤️ using Next.js and jsPDF