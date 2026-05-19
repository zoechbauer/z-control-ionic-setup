# z-control-ionic-setup

A reusable Ionic + Angular starter template for z-control apps, featuring a prebuilt settings page with all standard accordions and configuration patterns.

---

## Purpose

This project provides a consistent, ready-to-use foundation for all z-control apps. It includes:

- A settings page with all standard accordions used in previous apps
- Preconfigured scripts, Capacitor integration, and best practices
- Documentation and baseline configuration for rapid, reliable new app creation

---

## How to Use for a New App

Suppose you want to create a new app called `z-control-image-to-text`:

### 1. Clone the Starter

```bash
git clone https://github.com/zoechbauer/z-control-ionic-setup.git z-control-image-to-text
cd z-control-image-to-text
```

### 2. Remove Old Git History

```bash
rm -rf .git
```

### 3. Initialize a New Git Repository

```bash
git init
git add .
git commit -m "chore: initial commit for z-control-image-to-text"
```

### 4. Update Project Metadata

- Change the project name in `package.json`, `angular.json`, and `capacitor.config.ts` to `z-control-image-to-text`
- Update the app name, id, and branding as needed
- Adjust the README and documentation for the new app’s purpose

### 5. Create a New GitHub Repository

- Create a new repo on GitHub (e.g., `z-control-image-to-text`)
- Add it as the remote and push:

```bash
git remote add origin https://github.com/zoechbauer/z-control-image-to-text.git
git push -u origin master   # or main, depending on your branch
```

### 6. Start Development

```bash
npm install
npm start
```

---

## Summary

1. Clone the template repo to a new folder
2. Remove the old `.git` directory
3. Initialize a new git repo and make your first commit
4. Update all project names and settings
5. Push to a new GitHub repository
6. Begin development for your new app

---

This process ensures every new z-control app starts with your preferred settings page, structure, and best practices.
