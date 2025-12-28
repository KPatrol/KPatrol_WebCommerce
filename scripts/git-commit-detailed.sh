#!/bin/bash

# K-Patrol Web Commerce - Detailed Git Commit Script
# Creates 20-40 structured commits for web-commerce landing page
# Run from: /Users/vudangkhoa/Working/KPatrol

set -e

REPO_ROOT="/Users/vudangkhoa/Working/KPatrol"
WEB_DIR="web-commerce"

cd "$REPO_ROOT"

echo "🚀 K-Patrol Web Commerce - Git Commit Script"
echo "============================================="
echo "📁 Repository: $REPO_ROOT"
echo ""

# Function to commit a single file or pattern
commit_single() {
    local file="$1"
    local msg="$2"
    
    if [ -f "$file" ] || [ -d "$file" ]; then
        git add "$file" 2>/dev/null || true
        if ! git diff --cached --quiet 2>/dev/null; then
            git commit -m "$msg" --no-verify
            echo "✅ $msg"
            return 0
        fi
    fi
    echo "⏭️  Skip: $msg"
    return 1
}

echo "📝 Starting commit sequence..."
echo ""

# === PROJECT SETUP (5 commits) ===
echo "--- Project Setup ---"
commit_single "$WEB_DIR/package.json" "chore(web): init package.json with Next.js 14"
commit_single "$WEB_DIR/tsconfig.json" "chore(web): add TypeScript config"
commit_single "$WEB_DIR/next.config.js" "chore(web): configure Next.js"
commit_single "$WEB_DIR/postcss.config.js" "chore(web): add PostCSS for Tailwind"
commit_single "$WEB_DIR/tailwind.config.ts" "style(web): setup Tailwind with blue theme"

# === DEPLOYMENT (2 commits) ===
echo ""
echo "--- Deployment ---"
commit_single "$WEB_DIR/Dockerfile" "ci(web): add Docker multi-stage build"
commit_single "$WEB_DIR/netlify.toml" "ci(web): add Netlify config"

# === ASSETS (2 commits) ===
echo ""
echo "--- Assets ---"
commit_single "$WEB_DIR/public/logo.png" "assets(web): add K-Patrol logo"
commit_single "$WEB_DIR/public/logo-icon.png" "assets(web): add logo icon variant"

# === CORE STYLES (2 commits) ===
echo ""
echo "--- Core Styles ---"
commit_single "$WEB_DIR/src/app/globals.css" "style(web): add glassmorphism CSS"
commit_single "$WEB_DIR/src/lib/utils.ts" "feat(web): add cn utility function"

# === APP STRUCTURE (2 commits) ===
echo ""
echo "--- App Structure ---"
commit_single "$WEB_DIR/src/app/layout.tsx" "feat(web): create root layout"
commit_single "$WEB_DIR/src/app/page.tsx" "feat(web): create landing page"

# === LAYOUT COMPONENTS (2 commits) ===
echo ""
echo "--- Layout Components ---"
commit_single "$WEB_DIR/src/components/layout/Navbar.tsx" "feat(web): add navbar with logo"
commit_single "$WEB_DIR/src/components/layout/Footer.tsx" "feat(web): add footer with newsletter"

# === SECTIONS (8 commits) ===
echo ""
echo "--- Page Sections ---"
commit_single "$WEB_DIR/src/components/sections/HeroSection.tsx" "feat(web): add hero with particles"
commit_single "$WEB_DIR/src/components/sections/FeaturesSection.tsx" "feat(web): add bento features grid"
commit_single "$WEB_DIR/src/components/sections/SpecsSection.tsx" "feat(web): add tabbed specs section"
commit_single "$WEB_DIR/src/components/sections/UseCasesSection.tsx" "feat(web): add expandable use cases"
commit_single "$WEB_DIR/src/components/sections/CTASection.tsx" "feat(web): add pricing and form"
commit_single "$WEB_DIR/src/components/sections/TestimonialsSection.tsx" "feat(web): add testimonials carousel"
commit_single "$WEB_DIR/src/components/sections/PartnersSection.tsx" "feat(web): add partners marquee"

# === UI COMPONENTS (if exist) ===
echo ""
echo "--- UI Components ---"
if [ -d "$WEB_DIR/src/components/ui" ]; then
    for file in "$WEB_DIR/src/components/ui"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file" .tsx)
            commit_single "$file" "feat(web): add $filename component"
        fi
    done
fi

# === SCRIPTS ===
echo ""
echo "--- Scripts ---"
commit_single "$WEB_DIR/scripts/git-push.sh" "chore(web): add git push script"
commit_single "$WEB_DIR/scripts/git-commit-detailed.sh" "chore(web): add commit script"

# === REMAINING FILES ===
echo ""
echo "--- Remaining Files ---"
git add "$WEB_DIR/" 2>/dev/null || true
if ! git diff --cached --quiet 2>/dev/null; then
    git commit -m "chore(web): add remaining files" --no-verify
    echo "✅ chore(web): add remaining files"
fi

echo ""
echo "============================================="
echo "✅ Commit sequence complete!"
echo ""
echo "📋 Commit history:"
git log --oneline -25
echo ""
echo "📊 Total commits: $(git rev-list --count HEAD)"
echo ""
echo "🚀 To push: git push origin main"
