param(
  [int]$DelaySeconds = 10,
  [string]$MessagePrefix = "Autosave AI Compass site",
  [switch]$RunCheck,
  [switch]$Push
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$autosaveScript = Join-Path $PSScriptRoot "git-autosave.ps1"
$ignoredRoots = @(".git", "node_modules", "dist")

function Test-UsefulPath {
  param([string]$Path)

  if (-not $Path) {
    return $false
  }

  $relative = [System.IO.Path]::GetRelativePath($root, $Path)
  if ($relative.StartsWith("..")) {
    return $false
  }

  $firstPart = $relative.Split([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)[0]
  if ($ignoredRoots -contains $firstPart) {
    return $false
  }

  return $true
}

Write-Host "Watching $root for local autosaves. Press Ctrl+C to stop."
if ($Push) {
  Write-Host "After changes settle for $DelaySeconds seconds, Git will create a local commit, write a version comparison report, and push to origin/main."
}
else {
  Write-Host "After changes settle for $DelaySeconds seconds, Git will create a local commit and version comparison report."
}

$watcher = [System.IO.FileSystemWatcher]::new($root)
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]"FileName, DirectoryName, LastWrite, Size"

$lastChange = $null
$pending = $false

$action = {
  if (Test-UsefulPath -Path $Event.SourceEventArgs.FullPath) {
    $script:lastChange = Get-Date
    $script:pending = $true
  }
}

$subscriptions = @(
  Register-ObjectEvent $watcher Changed -Action $action
  Register-ObjectEvent $watcher Created -Action $action
  Register-ObjectEvent $watcher Deleted -Action $action
  Register-ObjectEvent $watcher Renamed -Action $action
)

try {
  while ($true) {
    Start-Sleep -Seconds 2

    if (-not $pending -or -not $lastChange) {
      continue
    }

    $elapsed = ((Get-Date) - $lastChange).TotalSeconds
    if ($elapsed -lt $DelaySeconds) {
      continue
    }

    $pending = $false

    try {
      $args = @("-ExecutionPolicy", "Bypass", "-File", $autosaveScript, "-MessagePrefix", $MessagePrefix)
      if ($RunCheck) {
        $args += "-RunCheck"
      }
      if ($Push) {
        $args += "-Push"
      }

      & powershell @args
      if ($LASTEXITCODE -ne 0) {
        Write-Warning "Autosave command exited with code $LASTEXITCODE."
      }
    }
    catch {
      Write-Warning "Autosave failed: $($_.Exception.Message)"
    }
  }
}
finally {
  foreach ($subscription in $subscriptions) {
    Unregister-Event -SubscriptionId $subscription.Id -ErrorAction SilentlyContinue
  }

  $watcher.Dispose()
}
