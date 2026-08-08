@echo off
git config user.email "oxidacionz@github.com"
git config user.name "Oxidacionz"
git branch -M main
git add .
git commit -m "Initial commit: Exodus landing page with 4 months free promo and GitHub Pages workflow"
git remote remove origin 2>nul
git remote add origin git@github.com:Oxidacionz/exodus-landing.git
git push -u origin main
