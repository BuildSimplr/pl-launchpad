<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# pm-launchpad

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

## 🎯 Purpose

This project is both a learning vehicle for mastering AWS cloud services and a production-minded portfolio piece demonstrating end-to-end cloud application development.

>>>>>>> fef12ff4db74ad6c0cb87d83340a4bb7771caebf
