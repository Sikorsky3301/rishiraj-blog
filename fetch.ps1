# fetch.ps1 — fetches new YouTube videos, summarizes with Groq, inserts into Supabase
# Usage: ./fetch.ps1

$envFile = ".env.local"

if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: .env.local not found. Copy .env.local.example and fill in your keys." -ForegroundColor Red
    exit 1
}

# Load .env.local
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
    }
}

foreach ($var in @('YOUTUBE_RSS_URLS','GROQ_API_KEY','SUPABASE_URL','SUPABASE_SERVICE_KEY')) {
    if (-not [System.Environment]::GetEnvironmentVariable($var, 'Process')) {
        Write-Host "ERROR: $var is missing from .env.local" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
pip install feedparser youtube-transcript-api groq supabase -q

Write-Host "`nFetching and inserting videos..." -ForegroundColor Cyan
python scripts/fetch_videos.py

Write-Host "`nDone. Vercel will serve new posts on the next page load (ISR revalidates every hour)." -ForegroundColor Green
