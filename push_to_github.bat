@echo off
git config user.email "oxidacionz@github.com"
git config user.name "Oxidacionz"
git branch -M main
git add .
git commit -m "Make demo branch names, products and locations generic for public audience"
git remote set-url origin https://github.com/Oxidacionz/exodus-landing.git
git push -u origin main
