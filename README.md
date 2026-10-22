# UNO PERFUMES — Fruit of the Forest

A responsive, single-page cinematic fragrance story built with HTML, CSS, and vanilla JavaScript.

## Website experience

1. **Start Experience** landing screen.
2. Full-screen intro film (`assets/intro.mp4`), with sound toggle and Skip Intro controls.
3. Artwork in motion (`assets/subtle-artwork.mp4`), muted and looping by default with an optional sound toggle.
4. Poetic story, credited to Barbie Vicenta & Uno.
5. Accord profile infographic.
6. Top, heart, and base note infographics.
7. Perfume details: creator Fiel Valdez, oil concentration 35%, batch year 2026.

Only the batch year is displayed; no batch number is included.

## Preview on your computer

### Option A — simple local server (recommended)

1. Extract the whole project folder.
2. Open a terminal/Command Prompt inside `fruit-of-the-forest-website-v3`.
3. If Python is installed, run:

   ```bash
   python -m http.server 8000
   ```

4. Open <http://localhost:8000> in your browser.
5. Click **Start experience** and try the sound/skip controls. Scroll through the artwork, story, accord profile, notes, and perfume details.
6. Stop the server with `Ctrl+C` in the terminal when you're finished.

Because media playback can vary when files are opened directly with `file://`, using the local server is more reliable than double-clicking `index.html`.

### Option B — Visual Studio Code

1. Open the extracted folder in Visual Studio Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.

## Publish it online with Netlify

1. Extract the downloaded ZIP.
2. Go to <https://app.netlify.com/drop>.
3. Upload the entire extracted project folder (the `index.html`, CSS, JS, and `assets` folder must remain together).
4. Wait for Netlify to deploy it and open the generated `netlify.app` URL.

You can attach a custom domain later in your hosting settings. This package has not been deployed; the hosting steps need to be completed by you.

## Files

- `index.html` — page structure and content
- `styles.css` — responsive visual design and transitions
- `script.js` — intro controls, navigation, sound buttons, and scroll reveals
- `assets/` — supplied logo, image assets, optimized videos, and poster frames

## Notes

- Video files have been re-encoded for smaller web delivery. The intro is 1920×1080 H.264/AAC; the subtly animated artwork retains its supplied 832×480 resolution.
- Intro playback starts only after the visitor clicks the button, so browsers can honor the sound gesture. If playback fails, Skip Intro remains available.
- The artwork video loops silently by default to avoid unexpected audio; its sound toggle remains available.
- The site loads Google Fonts when internet is available and falls back to system serif/sans-serif fonts offline.
