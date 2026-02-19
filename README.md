# vighnesh.space - Next.js Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This is a complete rewrite of the original static HTML site, featuring improved performance, SEO optimization, and modern React patterns.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI across all devices
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **SEO Optimized**: Proper meta tags, Open Graph, and Twitter Cards
- **Interactive Gallery**: Category filtering with lightbox functionality
- **Contact Form**: Client-side validation with React hooks
- **Performance**: Optimized images, code splitting, and efficient bundling
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: Semantic HTML and keyboard navigation support

## 📁 Project Structure

```
vighnesh-space-nextjs/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── gallery/           # Gallery page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   └── components/            # Reusable components
│       ├── ui/               # UI components
│       │   └── Lightbox.tsx  # Lightbox component
│       ├── Footer.tsx        # Footer component
│       └── Navigation.tsx    # Navigation component
├── public/                   # Static assets
│   ├── images/              # Image assets
│   │   └── gallery/         # Gallery images
│   │       ├── thumbnails/  # Optimized thumbnails
│   │       └── web-optimized/ # Web-optimized images
│   └── favicon.ico          # Favicon
├── tailwind.config.js       # Tailwind configuration
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Montserrat, Inter)
- **Image Optimization**: Next.js Image component
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vighnesh-space-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🎨 Customization

### Updating Gallery Images

1. Add your images to `public/images/gallery/`
2. Create optimized versions:
   - Thumbnails: 800px max width for gallery grid
   - Web-optimized: 1200px max width for lightbox
3. Update the `galleryItems` array in `src/app/gallery/page.tsx`

### Styling

The project uses Tailwind CSS with custom CSS for complex animations and gallery functionality. Key style files:

- `src/app/globals.css` - Global styles and custom CSS
- `tailwind.config.js` - Tailwind configuration with custom fonts

### Content Updates

- **Homepage**: Edit `src/app/page.tsx`
- **About**: Edit `src/app/about/page.tsx`
- **Contact**: Edit `src/app/contact/page.tsx`
- **Navigation**: Edit `src/components/Navigation.tsx`

## 🔧 Configuration

### Next.js Configuration

The `next.config.ts` file includes:
- Image domain configuration for external images
- Compiler optimizations for production
- Image format optimization (WebP, AVIF)

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```bash
# Add your environment variables here
# Example:
# NEXT_PUBLIC_SITE_URL=https://vighnesh.space
```

## 📱 Pages

### Homepage (`/`)
- Hero section with biography
- Call-to-action buttons
- Responsive image background

### About (`/about`)
- Personal story and philosophy
- Skills showcase with icons
- Interactive skill cards
- Call-to-action section

### Gallery (`/gallery`)
- Category-based filtering
- Optimized image grid
- Lightbox functionality
- Keyboard navigation

### Contact (`/contact`)
- Contact form with validation
- Contact information
- Social media links
- Success/error notifications

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Other Platforms

The application is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Any hosting service supporting Node.js

## 📊 Performance

The application is optimized for performance with:
- Next.js Image optimization
- Code splitting
- Tree shaking
- Lazy loading
- WebP/AVIF image formats
- Efficient CSS with Tailwind

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please contact:
- Email: hello@vighnesh.space
- GitHub: [Create an issue](https://github.com/vkiooz/vighnesh-space/issues)

---

Built with ❤️ using Next.js and modern web technologies. 