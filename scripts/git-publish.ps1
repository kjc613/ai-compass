param(
  [string]$Message
)

$ErrorActionPreference = "Stop"

function Invoke-GitChecked {
  param(
    [string[]]$GitArgs
  )

  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

if (-not $Message) {
  $Message = "Update AI Compass site"
}

Invoke-GitChecked @("fetch", "origin", "main")

$status = git status --porcelain
if (-not $status) {
  $branchStatus = git status --short --branch
  if ($branchStatus -match "behind \d+") {
    Invoke-GitChecked @("pull", "--rebase", "origin", "main")
    $branchStatus = git status --short --branch
  }

  if ($branchStatus -match "ahead \d+") {
    Invoke-GitChecked @("push", "origin", "main")
    Write-Host "Published existing commits to GitHub main."
    exit 0
  }

  Write-Host "No local changes or unpublished commits to publish."
  exit 0
}

Invoke-GitChecked @("add", "-A")
Invoke-GitChecked @("commit", "-m", $Message)
Invoke-GitChecked @("pull", "--rebase", "origin", "main")
Invoke-GitChecked @("push", "origin", "main")

Write-Host "Published changes to GitHub main."
