<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Booking forms

Date-of-birth rules (required, valid, never later than today) live in `src/lib/dates.ts` and are enforced by `BirthDatePicker` (`src/components/site/BirthDatePicker.tsx`) — the only birth-date control in booking forms; keep every booking form using it and keep validating on submit, since a picker alone can be bypassed. Compare local ISO dates there, never `toISOString()`, so a visitor near midnight is not shifted a day. Why: one shared rule set keeps all booking forms consistent and testable.
