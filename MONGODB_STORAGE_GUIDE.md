# MongoDB Storage Guide for SpiritualDaily

## 1. MongoDB Atlas Free Tier Limits

| Feature | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Storage** | 512 MB | Unlimited (pay per GB) |
| **Databases** | Up to 3 | Unlimited |
| **Connections** | Shared | Dedicated |
| **Backup** | None | Automatic |
| **Cost** | FREE | $0.10/GB/month |

---

## 2. How Much News Data Can You Store?

### Average News Article Size

For your News model with fields:
- `title` (string): ~100 bytes
- `description` (string): ~500 bytes
- `content` (string): ~2000 bytes
- `imageUrl` (string): ~200 bytes
- `createdAt` (date): ~8 bytes
- MongoDB metadata: ~100 bytes

**Total per article: ~2.9 KB**

### Storage Calculations

| Articles | Storage | Cost (Paid) |
|----------|---------|------------|
| 100 | 290 KB | FREE ✓ |
| 500 | 1.5 MB | FREE ✓ |
| 1,000 | 2.9 MB | FREE ✓ |
| 5,000 | 14.5 MB | FREE ✓ |
| 10,000 | 29 MB | FREE ✓ |
| 50,000 | 145 MB | FREE ✓ |
| 100,000 | 290 MB | FREE ✓ |
| **150,000** | **435 MB** | FREE ✓ |
| **175,000** | **510 MB** | **EXCEEDS FREE** ⚠️ |
| 200,000 | 580 MB | $0.10/month |
| 500,000 | 1.45 GB | ~$1.50/month |
| 1,000,000 | 2.9 GB | ~$3/month |

---

## 3. Free Tier Storage Breakdown

**512 MB can hold approximately:**
- **~175,000 news articles**
- OR **~6 years of daily content** (assuming 80 articles/day)
- OR **~2 years of daily content** (assuming 250 articles/day)

---

## 4. What Happens When You Exceed 512 MB?

### Option A: Free Tier
- ❌ Cannot store more data
- ❌ Database becomes read-only
- ❌ New articles cannot be added
- ✓ Existing data remains accessible

### Option B: Upgrade to Paid Tier
- ✓ Automatic billing starts
- ✓ Pay only what you use ($0.10/GB/month)
- ✓ No downtime or data loss
- ✓ Unlimited storage

---

## 5. Reducing Storage Usage

### Optimize Your Data

```javascript
// Bad: Storing full article text
{
  title: "Article",
  description: "...",
  content: "...very long text...",  // Can be 5-10 KB
  imageUrl: "https://..."
}

// Good: Store summary, full content in separate table
{
  title: "Article",
  summary: "...",  // ~200 bytes
  contentId: ObjectId("..."),  // Reference to separate collection
  imageUrl: "https://..."
}
```

### Delete Old Articles
```javascript
// Keep only last 5 years of articles
db.news.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 5*365*24*60*60*1000) }
})
```

### Enable Compression
MongoDB automatically compresses data, reducing size by ~50-70%.

---

## 6. Storage Monitoring

### Check Current Usage (MongoDB Atlas)

1. Go to https://cloud.mongodb.com/
2. Click your Cluster
3. Click "Collections" tab
4. See storage stats

### CLI Command
```bash
# Connect to MongoDB and check
mongosh
show dbs  # Shows database sizes
db.stats()  # Shows current database stats
```

---

## 7. Recommendations for SpiritualDaily

### Phase 1: Launch (Free Tier - 512 MB)
- Store up to **100,000 articles** comfortably
- Budget: **$0/month**
- Good for: First 2-3 years

### Phase 2: Growth (Upgrade to Paid)
- When you reach ~400 MB usage
- Upgrade to $10-15/month plan
- Good for: Large scale deployment

### Phase 3: Scale (Dedicated Server)
- When you have 1M+ articles
- Consider MongoDB Dedicated tier
- Or migrate to PostgreSQL for cost savings

---

## 8. Real-World Examples

### Scenario A: Religious Daily Devotional
- 1 article/day
- 365 articles/year
- **Free tier lasts 475+ years** ✓

### Scenario B: News Website
- 50 articles/day
- 18,250 articles/year
- **Free tier lasts ~9.5 years** ✓

### Scenario C: High-Volume News Site
- 200 articles/day
- 73,000 articles/year
- **Free tier lasts ~2.4 years** ✓

### Scenario D: Content Archive
- 500 articles/day
- **Exceeds free tier in ~1 year**
- **Upgrade needed: $0.50/month for paid tier** ✓

---

## 9. Upgrading from Free to Paid

### Step 1: Go to MongoDB Atlas
- https://cloud.mongodb.com/
- Select your cluster

### Step 2: Upgrade
- Click "Billing" → "Upgrade"
- Choose paid tier
- Automatic billing starts ($0.10/GB/month)

### Step 3: No Migration Needed
- Your data stays intact
- No downtime
- Automatic upgrade

---

## 10. Cost Comparison (Annual)

| Storage | Articles | Annual Cost |
|---------|----------|------------|
| 512 MB | 175K | $0 (free) |
| 1 GB | 350K | ~$12/year |
| 10 GB | 3.5M | ~$120/year |
| 100 GB | 35M | ~$1,200/year |

---

## Summary

✅ **For SpiritualDaily:** Free tier (512 MB) is perfect for your first 2-3 years
✅ **Can store:** 100K-175K news articles for free
✅ **Cost to upgrade:** Only $0.10/GB/month (extremely affordable)
✅ **No data loss:** Seamless upgrade when needed

Your devotional news project won't hit storage limits for years!
