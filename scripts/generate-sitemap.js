import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuration
const DOMAIN = 'https://www.paintbyte.com.ng'
const API_URL = process.env.VITE_API_URL || 'https://api.paintbyte.com.ng' // Replace with your production API URL
const TODAY = new Date().toISOString().split('T')[0]

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Static routes configuration
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/studio', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
]

async function generateSitemap() {
  console.log('🔄 Generating sitemap.xml...')

  let projectRoutes = []

  // Fetch dynamic portfolio project IDs/slugs from your API
  try {
    const response = await fetch(`${API_URL}/api/projects`)
    if (response.ok) {
      const projects = await response.json()
      projectRoutes = projects.map((project) => ({
        path: `/portfolio/${project._id || project.id || project.slug}`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: project.updatedAt
          ? new Date(project.updatedAt).toISOString().split('T')[0]
          : TODAY,
      }))
      console.log(`✅ Fetched ${projectRoutes.length} dynamic portfolio items.`)
    } else {
      console.warn(`⚠️ API responded with status ${response.status}. Skipping dynamic routes.`)
    }
  } catch (error) {
    console.warn('⚠️ Could not connect to API during build. Proceeding with static routes only.')
  }

  const allRoutes = [...staticRoutes, ...projectRoutes]

  // XML Construction
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    return `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${route.lastmod || TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  // Save XML directly into the public directory
  const publicDir = path.join(__dirname, '..', 'public')
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const outputPath = path.join(publicDir, 'sitemap.xml')
  fs.writeFileSync(outputPath, xmlContent, 'utf8')

  console.log(`🚀 sitemap.xml successfully generated at: ${outputPath}`)
}

generateSitemap()