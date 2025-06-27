# 📬 nest-mail-contact-service

&#x20;&#x20;

A simple and secure **NestJS** service that receives contact form submissions via HTTP and forwards them to a designated Gmail account using SMTP. Built with TypeScript, Docker, and `pnpm`.

---

## 🚀 Features

- ✅ **Send emails** via Gmail SMTP
- 🔀 **Reply-To user’s email** (so you can reply easily)
- 📩 **Secure contact API** (`POST /mail/contact`)
- 🐳 **Dockerized**, with separate dev/prod workflows
- 🧱 Clean, maintainable architecture (DTOs, service, controller)
- 💜 Type-safe (TypeScript) with runtime validation (DTOs)
- 🌐 Supports real-time dev with hot reload

---

## 📁 Folder Structure

```
nest-mail-contact-service/
├── src/
│   ├── mail/
│   │   ├── dto/
│   │   │   └── contact.dto.ts
│   │   ├── mail.controller.ts
│   │   └── mail.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── Dockerfile          # production image
├── Dockerfile.dev      # development image
├── docker-compose.dev.yml
├── README.md
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## ⚙️ Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/nest-mail-contact-service.git
cd nest-mail-contact-service
pnpm install
```

### 2. Create `.env` with:

```env
PORT=3000
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_password
MAIL_RECIPIENT=mohamedbrzan.dev@gmail.com
```

> Use a Gmail App Password (2FA required) — see [Google App Passwords](https://myaccount.google.com/apppasswords).

---

### 3. Development (Hot Reload with Docker)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Visit `http://localhost:3000` — service restarts on code changes.

---

### 4. Sending a Test Email (Postman/cURL)

**Endpoint:** `POST http://localhost:3000/mail/contact`\
**Body (JSON):**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello Mohamed, loved your project!"
}
```

---

### 5. Production Build & Run

```bash
docker build -t nest-mail-contact-service .
docker run --env-file .env -p 3000:3000 nest-mail-contact-service
```

---

## 🛠️ API Reference

### `POST /mail/contact`

| Field   | Type   | Description            |
| ------- | ------ | ---------------------- |
| name    | string | Sender’s name          |
| email   | string | Sender’s email address |
| message | string | The message content    |

**Success Response:**

```json
{ "status": "ok", "message": "Message sent" }
```

**Error Response:** `400` or `500` with validation or server errors.

---

## 🔒 Security Advice

- Validate inputs using classes and `class-validator`
- Use rate limiting (e.g., `@nestjs/throttler`)
- Optionally use CAPTCHA to avoid spam
- For real "From" field, consider using SendGrid or Mailgun with verified domains

---

## 💡 Optimizations & Extensibility

- Swap Gmail SMTP for a transactional mail service
- Add attachment support (`@nestjs-modules/mailer` supports it)
- Deploy via CI/CD pipelines (GitHub Actions, GitLab CI, etc.)
- Docker Compose for prod-ready deployment

---

## 🌟 Contribution

1. Fork & clone
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit and push changes
4. Open a PR

---

## 📓 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 📈 Preview



---

## 🔗 Useful Links

- [NestJS Docs](https://docs.nestjs.com/)
- [Gmail App Password Guide](https://support.google.com/accounts/answer/185833)
- [pnpm Docs](https://pnpm.io/)

---

*Created with professionalism and developer experience in mind.*

