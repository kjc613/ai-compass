param(
  [string]$MessagePrefix = "Autosave AI Compass site",
  [string]$ReportDir = "version-reports",
  [switch]$RunCheck,
  [switch]$Push
)

$ErrorActionPreference = "Stop"

function Invoke-GitChecked {
  param([string[]]$GitArgs)

  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

function Get-GitText {
  param([string[]]$GitArgs)

  $output = & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }

  return ($output -join [Environment]::NewLine)
}

$root = Get-GitText @("rev-parse", "--show-toplevel")
Set-Location $root

$statusBefore = Get-GitText @("status", "--short")
if (-not $statusBefore) {
  if ($Push) {
    $branchStatus = Get-GitText @("status", "--short", "--branch")
    if ($branchStatus -match "behind \d+") {
      Invoke-GitChecked @("pull", "--rebase", "origin", "main")
      $branchStatus = Get-GitText @("status", "--short", "--branch")
    }

    if ($branchStatus -match "ahead \d+") {
      Invoke-GitChecked @("push", "origin", "main")
      Write-Host "Pushed existing local commits to GitHub."
      exit 0
    }
  }

  Write-Host "No local changes to autosave."
  exit 0
}

if ($RunCheck) {
  & npm.cmd run check
  if ($LASTEXITCODE -ne 0) {
    throw "npm.cmd run check failed with exit code $LASTEXITCODE"
  }
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$baseCommit = Get-GitText @("rev-parse", "--short", "HEAD")
$reportRoot = Join-Path $root $ReportDir
$patchRoot = Join-Path $reportRoot "patches"
New-Item -ItemType Directory -Force -Path $reportRoot, $patchRoot | Out-Null

Invoke-GitChecked @("add", "-A")

$stagedStatus = Get-GitText @("diff", "--cached", "--name-status", "HEAD")
if (-not $stagedStatus) {
  Write-Host "No staged changes to autosave."
  exit 0
}

$diffStat = Get-GitText @("diff", "--cached", "--stat", "HEAD")
$numStat = Get-GitText @("diff", "--cached", "--numstat", "HEAD")
$patchPath = Join-Path $patchRoot "$timestamp.patch"
$reportPath = Join-Path $reportRoot "$timestamp.md"

Get-GitText @("diff", "--cached", "--binary", "HEAD") | Set-Content -Path $patchPath -Encoding UTF8

$message = "$MessagePrefix - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$report = @"
# Version Compare - $timestamp

Commit message:

~~~text
$message
~~~

Base commit before this autosave:

~~~text
$baseCommit
~~~

Changed files before staging:

~~~text
$statusBefore
~~~

Staged file changes:

~~~text
$stagedStatus
~~~

Diff summary:

~~~text
$diffStat
~~~

Line changes:

~~~text
$numStat
~~~

Full patch:

~~~text
$ReportDir/patches/$timestamp.patch
~~~
"@

$report | Set-Content -Path $reportPath -Encoding UTF8
Invoke-GitChecked @("add", "-A", $ReportDir)
Invoke-GitChecked @("commit", "-m", $message)

$newCommit = Get-GitText @("rev-parse", "--short", "HEAD")
Write-Host "Autosaved changes in commit $newCommit."
Write-Host "Version report: $ReportDir/$timestamp.md"

if ($Push) {
  Invoke-GitChecked @("pull", "--rebase", "origin", "main")
  Invoke-GitChecked @("push", "origin", "main")
  Write-Host "Pushed $newCommit to GitHub."
}
