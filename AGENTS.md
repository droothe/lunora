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
