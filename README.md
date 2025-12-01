# Homewise - AI Real Estate Agent Platform

A modern, full-featured real estate agent management platform built with Next.js, TypeScript, and Tailwind CSS. Homewise helps real estate agents efficiently manage clients, properties, and generate AI-powered property recommendations.

## 🚀 Features

### Core Functionality

- **📊 Dashboard**: Comprehensive overview with key metrics, recent clients, quick actions, and actionable insights
- **👥 Client Management**: Full client lifecycle management with search, filters, and detailed profiles
- **🏠 Property Management**: Advanced property search, filtering, and agent annotation system
- **📋 Recommendation Reports**: AI-powered property matching and recommendation generation
- **📈 Analytics Dashboard**: Performance metrics, visualizations, and business insights
- **⚙️ Settings**: Comprehensive user preferences and notification settings

### Advanced Features

- **AI Property Matching**: Intelligent algorithm that matches properties based on:
  - Budget range (40% weight)
  - Bedroom count (20% weight)
  - Bathroom count (15% weight)
  - Location preferences (15% weight)
  - Property type (10% weight)

- **Property Annotation**: Agents can add custom notes, ratings, tags, and track view counts
- **Report Management**: Create, edit, add/remove properties, export PDF, and send via email
- **Mobile Responsive**: Fully optimized for all device sizes with mobile-first design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd homewise_agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
homewise_agent/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── clients/           # Client management
│   ├── properties/        # Property search and management
│   ├── recommendations/   # Recommendation reports
│   ├── analytics/         # Analytics dashboard
│   └── settings/          # User settings
├── components/            # Reusable React components
├── lib/                   # Utilities and helpers
│   ├── mockData.ts        # Mock data for development
│   └── generateRecommendation.ts  # AI matching algorithm
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🎯 Key Pages

### Dashboard (`/`)
- Overview of active clients, pending matches, and monthly recommendations
- Quick actions and insights
- Recent clients list

### Clients (`/clients`)
- Client list with search and status filters
- Create new clients
- View detailed client profiles with interaction history

### Properties (`/properties`)
- Advanced property search with multiple filters
- Property detail pages with agent annotations
- Add custom notes, ratings, and tags

### Recommendations (`/recommendations`)
- View all recommendation reports
- Generate new reports from client profiles
- Edit reports (add/remove properties)
- Export PDF and send via email

### Analytics (`/analytics`)
- Performance metrics and KPIs
- Interactive charts and visualizations
- Trend analysis

### Settings (`/settings`)
- Profile management
- Notification preferences
- Display preferences (currency, date format, timezone)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Currently, no environment variables are required for the MVP. For production deployment, you may want to add:

- Database connection strings
- API keys for email services
- Authentication secrets

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the project
   - Click "Deploy"

### Alternative: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## 📝 Usage Guide

### Generating Recommendations

1. Navigate to a client's detail page
2. Click "Generate Report" button
3. The AI algorithm will match properties based on client preferences
4. Review and edit the generated report
5. Export as PDF or send via email

### Managing Properties

1. Go to Properties page
2. Use search and filters to find properties
3. Click on a property to view details
4. Add agent notes, ratings, and tags
5. Mark properties as favorites

### Creating Reports

1. From client detail page, click "Generate Report"
2. In the report detail page, you can:
   - Add more properties using "Add Properties" button
   - Remove properties using the trash icon
   - Save changes
   - Export PDF
   - Send email to client

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Customize colors and themes in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary color palette
  }
}
```

### Mock Data

Update `lib/mockData.ts` to customize sample data for development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Build Errors

- Ensure Node.js version is 18+
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Runtime Errors

- Check browser console for JavaScript errors
- Verify all environment variables are set (if using)
- Check that all dependencies are installed

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js**
