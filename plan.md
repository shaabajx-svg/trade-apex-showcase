# Implementation Plan - Trade Real App

A simplified real-time trading simulator for tracking stock/crypto prices, managing a virtual portfolio, and executing trades (Buy/Sell) using client-side state.

## Scope & Non-Goals
- **Scope**: Dashboard with market overview, trade execution panel, portfolio tracking, and price charts (simulated).
- **Non-Goals**: Real money transactions, backend persistence (using localStorage), real-time WebSocket data (using simulated price movements for this demo, or public free APIs if available without keys).

## Assumptions & Open Questions
- **Data Persistence**: All user data (balance, holdings, history) will be stored in `localStorage`.
- **Market Data**: We will use a mock data generator to simulate "live" price movements for a responsive feel.

## Affected Areas
- **Frontend**: New components for Trading Chart, Order Book (mock), Portfolio Table, and Trade Form.
- **State Management**: React context or custom hooks to manage `localStorage` and trading logic.
- **UI/UX**: Using shadcn/ui components already present in the project.

## Phases & Deliverables

### Phase 1: Core State & Mock Data (frontend_engineer)
- Create a `useTrading` hook to handle:
  - Account balance (starting with $10,000).
  - Portfolio holdings.
  - Transaction history.
- Setup a mock price feed generator (Interval-based updates).

### Phase 2: Layout & Navigation (frontend_engineer)
- Dashboard layout with a sidebar or top nav.
- Responsive grid for Market Overview, Chart, and Trade Panel.

### Phase 3: Trading Components (frontend_engineer)
- **Market Table**: List of tradable assets with real-time price changes.
- **Trade Panel**: Buy/Sell inputs, order type (Market only for MVP), and "Max" button.
- **Chart Component**: A basic line chart representing price history (using `recharts` if available, or `src/components/ui/chart.tsx`).

### Phase 4: Portfolio & History (quick_fix_engineer)
- **Portfolio Summary**: Visual representation of assets held.
- **Activity Log**: List of past trades.
- Polish CSS and ensure "dark mode" looks good (given the theme variables).

## Specialist Assignments
- **frontend_engineer**: Phases 1, 2, and 3.
- **quick_fix_engineer**: Phase 4 and final UI polish.

## Sequencing Constraints
- Phase 1 must be completed before Phase 3 as components rely on the trading logic.
- Phase 2 can happen in parallel with Phase 1.
