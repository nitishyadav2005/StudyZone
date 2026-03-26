# Study Zone

Study Zone is a high-performance educational platform built with Next.js and Firebase, specifically designed for CBSE Classes 9-12, JEE, and NEET aspirants. It provides a structured and intuitive interface for accessing curated NCERT solutions, chapter-wise notes, and important previous year questions (PYQs).

## Core Features

- **Class-wise Resources**: Dedicated sections for Class 9 through Class 12.
- **Subject Specialization**: Categorized materials for Science, Mathematics, Physics, Chemistry, and Biology.
- **Natural Numerical Sorting**: Chapters and materials are automatically arranged in natural order (Chapter 1, 2, ... 10, 11).
- **Admin Dashboard**: Secure management interface for administrators to upload and organize study PDFs.
- **Modern UI**: A sleek, dark-themed interface built with Tailwind CSS and ShadCN UI for a focused learning experience.

## Technical Architecture

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS with neon-green accent theme
- **Database**: Firebase Firestore (Real-time synchronization)
- **Auth**: Firebase Authentication (Admin secure access)

## Getting Started

1. **Authentication**: Login via the `/auth` page to access admin management features.
2. **Learning**: Navigate through the homepage to find your specific class and subject.
