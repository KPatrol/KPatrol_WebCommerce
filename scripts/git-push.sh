#!/bin/bash

# K-Patrol Web Commerce - Git Push Script
# This script creates structured commits for the web-commerce landing page

set -e

cd "$(dirname "$0")/.."

echo "🚀 K-Patrol Web Commerce - Git Push Script"
echo "==========================================="

# Check if we're in git repo
if [ ! -d ".git" ] && [ ! -d "../.git" ]; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Go to root of monorepo if needed
if [ -d "../.git" ]; then
    cd ..
fi

echo "📁 Working directory: $(pwd)"

# Stage and commit function
commit_files() {
    local files="$1"
    local message="$2"
    
    if git add $files 2>/dev/null; then
        if git diff --cached --quiet; then
            echo "⏭️  Skip: $message (no changes)"
        else
            git commit -m "$message"
            echo "✅ Committed: $message"
        fi
    fi
}

echo ""
echo "📝 Creating structured commits..."
echo ""

# 1. Project Configuration
commit_files "web-commerce/package.json" "chore(web-commerce): init package.json with Next.js 14 deps"

commit_files "web-commerce/tsconfig.json" "chore(web-commerce): add TypeScript configuration"

commit_files "web-commerce/next.config.js" "chore(web-commerce): configure Next.js settings"

commit_files "web-commerce/postcss.config.js" "chore(web-commerce): add PostCSS config for Tailwind"

commit_files "web-commerce/tailwind.config.ts" "style(web-commerce): setup Tailwind with kpatrol theme"

# 2. Docker & Deployment
commit_files "web-commerce/Dockerfile" "ci(web-commerce): add Docker configuration"

commit_files "web-commerce/netlify.toml" "ci(web-commerce): add Netlify deployment config"

# 3. Public Assets
commit_files "web-commerce/public/" "assets(web-commerce): add logo and public assets"

# 4. Core Styles
commit_files "web-commerce/src/app/globals.css" "style(web-commerce): add global CSS with glass effects"

# 5. Utility Functions
commit_files "web-commerce/src/lib/utils.ts" "feat(web-commerce): add utility functions (cn helper)"

# 6. App Layout & Pages
commit_files "web-commerce/src/app/layout.tsx" "feat(web-commerce): create root layout with fonts"

commit_files "web-commerce/src/app/page.tsx" "feat(web-commerce): create main landing page"

# 7. Layout Components
commit_files "web-commerce/src/components/layout/Navbar.tsx" "feat(web-commerce): add responsive navbar with logo"

commit_files "web-commerce/src/components/layout/Footer.tsx" "feat(web-commerce): add footer with newsletter form"

# 8. Hero Section
commit_files "web-commerce/src/components/sections/HeroSection.tsx" "feat(web-commerce): create hero with 3D robot viz"

# 9. Features Section
commit_files "web-commerce/src/components/sections/FeaturesSection.tsx" "feat(web-commerce): add bento grid features section"

# 10. Specs Section
commit_files "web-commerce/src/components/sections/SpecsSection.tsx" "feat(web-commerce): add specs with tabbed interface"

# 11. Use Cases Section
commit_files "web-commerce/src/components/sections/UseCasesSection.tsx" "feat(web-commerce): add expandable use cases cards"

# 12. CTA Section
commit_files "web-commerce/src/components/sections/CTASection.tsx" "feat(web-commerce): add pricing and contact form"

# 13. Testimonials Section
commit_files "web-commerce/src/components/sections/TestimonialsSection.tsx" "feat(web-commerce): add testimonials carousel"

# 14. Partners Section
commit_files "web-commerce/src/components/sections/PartnersSection.tsx" "feat(web-commerce): add partners logo marquee"

# 15. UI Components (if any)
commit_files "web-commerce/src/components/ui/" "feat(web-commerce): add reusable UI components"

# 16. Scripts
commit_files "web-commerce/scripts/" "chore(web-commerce): add deployment scripts"

# 17. Any remaining files
commit_files "web-commerce/" "chore(web-commerce): add remaining config files"

echo ""
echo "==========================================="
echo "✅ All commits created successfully!"
echo ""

# Show commit log
echo "📋 Recent commits:"
git log --oneline -20

echo ""
echo "🔄 Ready to push? Run: git push origin main"
echo ""
