# Asset map — keep these filenames stable

Place all site media in this folder (`public/images/`). The website should reference these paths directly so replacing a file with the same name updates the image in the site.

| Filename | Purpose | Suggested content |
|---|---|---|
| `hero-girl.jpg` | Main birthday hero | A favorite portrait or a soft romantic illustration |
| `memory-01.jpg` | Memory gallery | First selected shared memory |
| `memory-02.jpg` | Memory gallery | Another favorite photo |
| `memory-03.jpg` | Memory gallery | A fun or candid moment |
| `memory-04.jpg` | Memory gallery | A meaningful shared memory |
| `memory-05.jpg` | Memory gallery | A place, object, or moment you both remember |
| `memory-06.jpg` | Memory gallery | One more favorite memory |
| `cake-decoration.png` | Optional cake decoration | Transparent cake/sticker decoration; CSS cake is fine too |
| `final-poster.jpg` | Video poster | A still image shown before the final video plays |
| `final-message.mp4` | Final video message | Your personal birthday message video |
| `background-music.mp3` | Optional music | Music you have permission to use |

## Important
- Replace an image by keeping the same filename and extension.
- If the extension changes (for example `.png` to `.jpg`), update the path in `src/data/siteContent.js`.
- Keep private photos local; do not upload them to a third-party service just to make the site work.
- If a file is not ready yet, the app should show a designed placeholder instead of a broken image.
- `reference-design.jpg` is only the visual design reference and should not be displayed as a memory photo by default.
