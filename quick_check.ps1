# Simple Daily Automation Script
# Run this daily to check repository status

$Date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$WorkspaceRoot = "C:\Users\roanc\.gemini\antigravity\scratch"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  DAILY REPOSITORY CHECK" -ForegroundColor Cyan
Write-Host "  $Date" -ForegroundColor Gray
Write-Host "========================================`n" -ForegroundColor Cyan

# Check dropship-blueprint
Write-Host "📦 dropship-blueprint-dashboard" -ForegroundColor Yellow
Set-Location "$WorkspaceRoot\dropship-blueprint"
git status --short
git log -1 --oneline
Write-Host ""

# Check eco-site-arg
Write-Host "📦 eco-site-arg" -ForegroundColor Yellow
Set-Location "$WorkspaceRoot\eco-site-arg"
git status --short
git log -1 --oneline
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ CHECK COMPLETE" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Set-Location $WorkspaceRoot
