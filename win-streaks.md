# Win Streaks

## Prompts

1. > win streaks - I want a win streak fun fact, current and longest per player, maybe some win details like dates of games and who was playing - maybe do details in a daisyui popup modal, or suggest something better. Don't do builds just change the code on the current branch and I'll run and test. How should we handle zero or one win in a row? Is that a win streak?

2. > So far so good. Can you also show the person that won the game that broke a player's longest winning streak? Just below their last win. Maybe highlighted. Or do you think we should have another fun fact for streak breakers?

3. > create win-streaks.md with my exact prompts and a summary of the interesting decisions you made for me and discussed with me

4. > I reviewed and saw state in the Home component - what is that for? Is it really needed?

5. > Don't forget to update the md file for this session

## Decisions

- **What counts as a streak:** 2 or more consecutive wins. Zero or one win is not a streak and shows `-` in the table. The threshold is the `MIN_STREAK_LENGTH` constant in `src/GameResults.ts`, so it is easy to change (e.g. to `1`).
- **Which games count:** only games the player took part in. A game they sat out does not break a streak; a loss does.
- **Ordering:** games are sorted chronologically by end time before streaks are computed. The table is sorted by longest streak, then current streak, then name.
- **Details UI:** a daisyUI modal opened from a per-row "Details" button, instead of an inline expandable row. It keeps the card compact on mobile. It lists the games in the current and longest streaks, each with its date and the opponents.
- **Streak breaker:** shown inline in the "Longest streak" section as a highlighted line below the last win ("Broken by {winner} on {date}"), rather than as a separate fun fact. It is only meaningful next to the streak it ended. A separate "most streaks ended" fact could be added later from the same data.
- **Breaker edge cases:** no breaker is shown if the longest streak is still active. If two streaks tie for longest, the earlier one is used.
- **State in `Home`:** `streakPlayer` (`useState`) records which row's Details button was clicked so the single shared modal can render that player's streaks; `selectedStreak` is derived from it. The `streakDialog` ref is not state, it only calls `showModal()`. Kept because it is the simplest approach; the alternative is one `<dialog>` per row with its own ref or id, which removes the state but adds a hidden dialog per player.
- **Process:** no builds were run; changes were made directly on the current branch for manual testing.

## Files changed

- `src/GameResults.ts` - `getWinStreaks`, `WinStreakEntry`, `StreakGame`, `MIN_STREAK_LENGTH`
- `src/App.tsx` - passes `winStreaks` to `Home`
- `src/Home.tsx` - Win Streaks card, details modal, breaker highlight
