# PM Launchpad

A serverless product management toolkit built on AWS. This app empowers product managers to manage OKRs, backlogs, meeting notes, and collect user feedback — all in one place. Built as a proof-of-concept to demonstrate technical depth and real-world cloud application design.

---

## ⚙️ Tech Stack

- **Frontend:** React (hosted on S3 + served via CloudFront) — fast, scalable UI
- **Backend:** AWS Lambda + API Gateway — cost-efficient serverless APIs
- **Auth:** Amazon Cognito — secure user auth with token-based access
- **Database:** DynamoDB (or RDS, based on feature data needs)
- **Storage:** Amazon S3 — for storing notes, attachments, and feedback exports
- **Monitoring:** AWS CloudWatch — logs, metrics, and real-time alerts

---

## 🧩 Features

- ✅ OKR Tracker — set and update Objectives and Key Results
- ✅ Backlog Board — simple Kanban-style task tracking
- ✅ Meeting Notes Archive — searchable, time-stamped entries
- ✅ Embedded Feedback Widget — lightweight Micro-SaaS add-on
- 🔒 Auth with Cognito — secure user login/session handling
- 📊 Admin Dashboard — visualize feedback + product health metrics

---

## 🚀 Deployment Plan

- **Frontend:** Deployed to S3 + delivered via CloudFront CDN
- **APIs:** Deployed via AWS Lambda + API Gateway
- **Infra:** Managed manually in AWS Console (Terraform/CDK planned)

---

## 🗓 Roadmap

- **Week 1:** Define architecture, set up S3 bucket, deploy React boilerplate
- **Week 2:** Implement user authentication via Cognito
- **Week 3:** Build OKR Tracker (CRUD flow, DynamoDB integration)
- **Week 4:** Add Backlog Board and Meeting Notes features
- **Week 5:** Integrate Micro-SaaS Feedback widget + DB wiring
- **Week 6:** Polish UI, implement monitoring (CloudWatch), finalize demo

---

## 🧪 Local Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Visit http://localhost:3000 in your browser.

🎯 Purpose
This project is both a learning vehicle for mastering AWS cloud services and a production-minded portfolio piece demonstrating end-to-end cloud application development.

### Run locally:
```bash
npm install
npm start

