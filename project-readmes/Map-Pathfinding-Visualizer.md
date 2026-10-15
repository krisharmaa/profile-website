# Map Pathfinding Visualizer

This project puts pathfinding on a map so the search is visible as it happens. Choose start and destination points, watch the algorithm visit nodes, and compare how different search strategies reach a route.

## What it explores

- A*, Dijkstra, Best-First, Beam Search, and Bidirectional Search
- Step-by-step search and route visualization
- Interactive start and destination markers
- Browser geolocation to center the map when permission is granted
- A small performance overlay for elapsed time and visited-node counts

## Public source repository

[Open MapFinding-Visualiser on GitHub](https://github.com/krisharmaa/MapFinding-Visualiser)

This public repository is a fork of [RishitModi/MapFinding-Visualiser](https://github.com/RishitModi/MapFinding-Visualiser). Its commit history and upstream attribution provide the context for the source code and changes in the fork.

## Run locally

The repository uses React and Vite. With Node.js and npm installed:

```bash
git clone https://github.com/krisharmaa/MapFinding-Visualiser.git
cd MapFinding-Visualiser
npm install
npm run dev
```

Vite prints the local development URL in the terminal. Browser geolocation requires permission and a secure context (localhost is allowed).

## Main technologies

- JavaScript and React
- Vite
- MapLibre GL and deck.gl
- Browser Geolocation API
