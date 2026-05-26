param(
  [string]$Message
)

$ErrorActionPreference = "Stop"

if (-not $Message) {
  $Message = "Update AI Compass site"
}

git fetch origin main

$status = git status --porcelain
if (-not $status) {
  Write-Host "No local changes to publish."
  exit 0
}

git add -A
git commit -m $Message
git pull --rebase origin main
git push origin main

Write-Host "Published changes to GitHub main."
