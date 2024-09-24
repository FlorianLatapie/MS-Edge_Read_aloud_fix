# MS-Edge_Read_aloud_fix

Read aloud is a very good feature of Microsoft Edge, but it has some issues with some characters like "<" ">" or "&" in the page content. This repository is a browser extention POC to fix this issue .

I'm not the only one currently having this problem, so I decided to create this project to share a solution that just replaces some characters by lookalike characters that are not skipped by the screen reader.

- [Read Aloud skips paragraph : r/MicrosoftEdge](https://www.reddit.com/r/MicrosoftEdge/comments/1eyml99/read_aloud_skips_paragraph/)
- [microsoft read aloud skips midway through - answers.microsoft.com](https://answers.microsoft.com/en-us/msoffice/forum/all/microsoft-read-aloud-skips-midway-through/9ee9e9f5-896c-411d-90c9-44463ead9eba)

## How to use

1. Clone this repository or download the zip file.
2. Open the Extension Management page by navigating to `edge://extensions`.
3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
4. Click the Load unpacked button and select the extension directory.

## ToDo and Ideas

- [ ] Add a UI to enable/disable the extension.
- [ ] Add a UI to add custom characters to replace.
- [ ] Add a UI to add custom ignored HTML elements.

## Credits

### Icon

- [IconBolt - Read aloud icon](https://www.iconbolt.com/iconsets/fluent-regular/read-aloud)
- [IconBolt - Wrench icon](https://www.iconbolt.com/iconsets/fluent-filled/wrench)
