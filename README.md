# Stivos

Stivos is a workplace health platform built on the Vitality model: employees earn rewards for staying active, and the rewards are paid for by employers and insurers.

This repo is a **clickable prototype** built with React + Vite. It runs entirely on mock data, with no backend and no wearable integrations, and has two views you can switch between from the toggle at the top:

- **Employee app**: daily activity, activity logging, on-site classes with booking, rewards, team challenges and a guided prevention program.
- **Funder dashboard**: what the employer or insurer sees: participation, adherence, sick-leave days avoided, estimated savings and a projected yearly figure, from aggregated, anonymous data.

The interface is in English. The mock pilot is set in Spain, so amounts are in euros and the people and companies have Spanish names. All of them, and all figures, are fictional.

## Run it

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Where things are

- `src/data.js`: all mock data. Every number on screen comes from here.
- `src/lib/useDemo.js`: the prototype's live state, so logging an activity or redeeming a reward updates every screen.
- `src/components/screens.jsx`: employee app screens.
- `src/components/PayerPanel.jsx`: funder dashboard.

## Built with Claude Code

This prototype was built with [Claude Code](https://claude.com/claude-code).

## License

Copyright (c) 2026 Alex Gambín Salat. All rights reserved. See [LICENSE](LICENSE).
