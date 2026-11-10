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

- Keep salon data in the root React Context across client-side navigation; this app is intentionally a frontend-only session demo.
- Keep booking date, validation and availability rules in a browser-safe pure module so the wizard and store enforce the same rules and can be tested.
- Use the shared accessible salon modal for booking and gallery overlays to provide focus trapping, scroll locking and Escape dismissal.

## Shared visible task status

- When a task reaches a clear outcome, use the VS Code integrated browser when available to show a full-viewport status: green for success, red for an error, and blue when waiting for the user's answer.
- Keep the status visible until the user responds; do not dismiss it with a timer. If an error is fixed, replace red with green.
- For questions, also use the normal chat question flow. If no integrated browser is available, report the status in chat and do not claim a screen was shown.
- Do not claim access to the user's external browser or imply background monitoring. See `../otomasyon.md`.
