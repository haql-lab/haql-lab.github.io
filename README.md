# Haql Marketing Website

Static marketing site for Haql - deterministic Python tools for oil and gas production data.

## Tools
- haql-qc: production data QC with verifiable audit trails
- haql-closeout: month-end closeout QC (well tests vs daily, downtime vs production, gaps, field balance, cumulatives, negatives, duplicates)
- haql-units: field-to-SI unit conversions (MIT)
- haql-coords: minimum curvature, DLS, UTM/WGS84 (MIT)

## Run locally
```bash
cd /home/cakepc/Desktop/workspace/haql-website
python3 -m http.server 8000
```

## Deployment (GitHub Pages)
1. Push to repo `haql` on `main` branch
2. Settings → Pages → Deploy from branch (main / root)
3. Live at https://no1mlengineer.github.io/
