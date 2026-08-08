@echo off
git config user.email "oxidacionz@github.com"
git config user.name "Oxidacionz"
git branch -M main
git add .
git commit -m "Fix GitHub Actions workflow using peaceiris/actions-gh-pages"
git remote set-url origin https://github.com/Oxidacionz/exodus-landing.git
git push -u origin main
