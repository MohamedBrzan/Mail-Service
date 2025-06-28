# 📬 NestJS Mail Server - Railway Deployment

A production-ready **NestJS** mail server that receives contact form submissions and forwards them via SMTP. Optimized for deployment on Railway.com.

## 🚀 Features

- ✅ **Send emails** via Gmail SMTP
- 🔀 **Reply-To user's email** for easy responses
- 📩 **Secure contact API** (`POST /mail/contact`)
- 🐳 **Dockerized** with multi-stage builds
- 🚂 **Railway-ready** deployment configuration
- 🧱 Clean architecture with DTOs and validation
- 💜 TypeScript with runtime validation
- 🛡️ Rate limiting and CORS protection
- 🏥 Health check endpoint

## 🚂 Railway Deployment

### Quick Deploy

1. **Fork/Clone** this repository
2. **Connect to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect the Dockerfile

### Environment Variables

Set these in Railway's environment variables:

```env
# Mail Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_password
MAIL_RECIPIENT=recipient@example.com

# Optional: CORS Origins (comma-separated)
ALLOWED_ORIGINS=https://yourdomain.com,https://anotherdomain.com
```

> **Important**: Use a Gmail App Password (2FA required) — see [Google App Passwords](https://myaccount.google.com/apppasswords).

### Deployment Steps

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Add Railway deployment config"
   git push origin main
   ```

2. **Railway will automatically**:

   - Build the Docker image
   - Deploy to production
   - Provide a public URL

3. **Set Environment Variables** in Railway dashboard

4. **Test the deployment**:

   ```bash
   # Health check
   curl https://your-app.railway.app/health

   # Send test email
   curl -X POST https://your-app.railway.app/mail/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "message": "Hello from Railway!"
     }'
   ```

## 🛠️ Local Development

### Prerequisites

- Node.js 20+
- pnpm
- Docker (optional)

### Setup

```bash
# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Start development server
pnpm start:dev
```

### Docker Development

```bash
# Build and run with Docker
docker build -t nest-mail-server .
docker run --env-file .env -p 3000:3000 nest-mail-server
```

## 📁 Project Structure

```
nest-mail-server/
├── src/
│   ├── app.controller.ts      # Health check & API info
│   ├── app.module.ts          # Main module configuration
│   ├── main.ts               # Application bootstrap
│   └── mail/
│       ├── dto/
│       │   └── contact.dto.ts
│       ├── mail.controller.ts
│       ├── mail.service.ts
│       └── mail.module.ts
├── Dockerfile                # Production Docker image
├── railway.json             # Railway deployment config
├── .dockerignore           # Docker build optimization
└── package.json
```

## 🛡️ Security Features

- **Rate Limiting**: 3 requests per minute per IP
- **Input Validation**: DTO-based validation with class-validator
- **CORS Protection**: Configurable origins
- **Environment Variables**: Secure configuration management
- **Non-root Docker**: Security-hardened container

## 📊 API Endpoints

### `GET /`

API information and available endpoints.

### `GET /health`

Health check endpoint for Railway monitoring.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### `POST /mail/contact`

Send a contact form email.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch!"
}
```

**Success Response:**

```json
{
  "status": "ok",
  "message": "Message sent"
}
```

## 🔧 Configuration

### Environment Variables

| Variable          | Description                    | Default          |
| ----------------- | ------------------------------ | ---------------- |
| `PORT`            | Server port                    | `3000`           |
| `MAIL_HOST`       | SMTP host                      | `smtp.gmail.com` |
| `MAIL_PORT`       | SMTP port                      | `587`            |
| `MAIL_USER`       | Gmail address                  | -                |
| `MAIL_PASS`       | Gmail app password             | -                |
| `MAIL_RECIPIENT`  | Recipient email                | -                |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | `*`              |

### Rate Limiting

Configured in `app.module.ts`:

- **Limit**: 3 requests per minute
- **TTL**: 60 seconds

## 🐛 Troubleshooting

### Common Issues

1. **Mail not sending**:

   - Check Gmail App Password
   - Verify SMTP settings
   - Check Railway logs

2. **Rate limiting**:

   - Wait 60 seconds between requests
   - Check IP address

3. **CORS errors**:
   - Set `ALLOWED_ORIGINS` environment variable
   - Check frontend domain

### Railway Logs

View logs in Railway dashboard:

```bash
# View recent logs
railway logs

# Follow logs in real-time
railway logs --follow
```

## 🚀 Production Checklist

- [ ] Environment variables set in Railway
- [ ] Gmail App Password configured
- [ ] CORS origins configured
- [ ] Health check endpoint working
- [ ] Rate limiting tested
- [ ] Email sending tested
- [ ] SSL certificate active (Railway handles this)

## 📈 Monitoring

Railway provides:

- **Automatic health checks**
- **Deployment logs**
- **Performance metrics**
- **Error tracking**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally and on Railway
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Deployed on Railway** 🚂 | **Built with NestJS** 🪺 | **TypeScript** 💜
