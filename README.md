# LearnHub — Front-End Assignment (Weeks 1–4)

A React & Next.js web application demonstrating all five assignment objectives.

## Project Structure


student-app/
├ app/
│   ├ globals.css    Global CSS styles & design tokens
│   ├ layout.js      Root HTML layout wrapper
│   ├ page.js        Home page (/)
│   ├ quiz/
│   │   └── page.js    Quiz page (/quiz)
│   ├ todo/
│   │   └ page.js    Task Manager (/todo)
│   └ about/
│       └ page.js    About page (/about)
├ components/
│   ├ Navbar.js      Sticky navigation bar
│   └ Footer.js      Page footer
├ next.config.js
└ package.json

##  Assignment Objectives Met

### 1. React + Next.js Setup
- Built with Next.js 14 App Router
- File-based routing (`/`, `/quiz`, `/todo`, `/about`)

### 2. Components & State
- **Navbar** — active link state via `usePathname`
- **Quiz Page** — `currentQ`, `selected`, `answered`, `score`, `finished` state
- **Todo Page** — `todos` array, `inputText`, `priority`, `filter`, `successMsg` state
- **About Page** — `form`, `errors`, `submitted`, `showMore` state
- **Props** used throughout (e.g. `TodoItem` receives `todo`, `onToggle`, `onDelete`)

### 3. Event Handling
| Handler | Interaction | Page |
|---------|-------------|------|
| `handleSelect` | Option button click | Quiz |
| `handleNext` | Next/Finish button click | Quiz |
| `handleAdd` | Add Task button click | Todo |
| `handleKeyDown` | Enter key press in input | Todo |
| `handleToggle` | Checkbox click | Todo |
| `handleDelete` | Delete button click | Todo |
| `handleSubmit` | Send Message button click | About |
| `setShowMore` | Toggle button click | About |

### 4. Conditional Rendering
- Quiz: question view vs. results screen
- Quiz: explanation box only after answering
- Quiz: correct/wrong answer highlighting
- Todo: success flash message after adding task
- Todo: empty state messages vary by filter
- Todo: "Clear done" button only when completed tasks exist
- About: contact form vs. success confirmation
- About: objectives list toggled by button
- About: form validation error messages

### 5. Styling
- CSS custom properties (design tokens) for consistent theming
- Google Fonts: Playfair Display (headings) + DM Sans (body) + DM Mono (code)
- Responsive layout — works on mobile and desktop
- Smooth animations with `fadeInUp` and staggered delays
- Interactive hover states, focus rings, and transitions

## 🎨 Design Decisions

- **Aesthetic**: Editorial / typographic — cream background, ink typography, accent red
- **Accessibility**: Semantic HTML, `aria-label` on icon buttons, focus styles
- **UX**: Flash messages, progress bars, empty states, disabled buttons until valid
