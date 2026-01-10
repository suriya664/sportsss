# How to Host Your Project on GitHub

## Step 1: Configure Git (First Time Only)

If you haven't set up Git on your computer, run these commands in PowerShell:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace "Your Name" and "your.email@example.com" with your actual name and GitHub email address.

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Enter a repository name (e.g., `spotrtsequiment`)
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 3: Connect Your Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands in PowerShell from your project directory:

```powershell
cd c:\Reactjs\spotrtsequiment
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

## Step 4: Authentication

When you run `git push`, GitHub will ask for authentication. You can:

**Option A: Use Personal Access Token (Recommended)**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

**Option B: Use GitHub CLI**
```powershell
gh auth login
```

## Step 5: Verify

After pushing, refresh your GitHub repository page. You should see all your files there!

## Future Updates

Whenever you make changes to your project:

```powershell
cd c:\Reactjs\spotrtsequiment
git add .
git commit -m "Description of your changes"
git push
```

## Optional: Deploy to GitHub Pages

To host your React app live on GitHub Pages:

1. Install gh-pages package:
```powershell
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```powershell
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`
