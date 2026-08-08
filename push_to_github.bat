@echo off
git config user.email "oxidacionz@github.com"
git config user.name "Oxidacionz"
git branch -M main
git add .
git commit -m "Update contact links with direct WhatsApp & Email, live BCV sync" 2>nul
git remote set-url origin https://github.com/Oxidacionz/exodus-landing.git
git push -u origin main
