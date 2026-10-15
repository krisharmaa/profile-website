# CampusConnect

CampusConnect is a college event discovery project. It is designed to help students find workshops, seminars, and other campus events that match their year, degree, and course.

## The idea

An event portal is easier to use when students can start with opportunities relevant to them. CampusConnect separates two common tasks:

- **Students** browse a feed matched to their academic profile and register for events.
- **Admins** manage event listings and the information students need to decide whether to attend.

The broader project uses a relational data model for profiles, events, and registrations. That makes the relationship between a student's context and the events shown in the interface explicit.

## Public source repository

[Open CampusConnect on GitHub](https://github.com/krisharmaa/CampusConnect---Inheritance-2026)

The current public repository contains the front-end code bundle. The profile-based matching and relational data model describe the wider project; this repository should not be read as a deployed production backend.

## Run the front end

The repository uses Vite. With Node.js and npm installed:

```bash
git clone https://github.com/krisharmaa/CampusConnect---Inheritance-2026.git
cd CampusConnect---Inheritance-2026
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Main technologies

- React
- TypeScript
- Vite
- SQL / MySQL in the wider project design
