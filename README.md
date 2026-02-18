# Maple Dark Pro

**Maple Dark Pro** is a dark theme for Zed, inspired by the popular 
[Maple theme](https://github.com/subframe7536/vscode-theme-maple) for VS Code.  

 - This version has been carefully **tweaked to be WCAG AA compliant**, making it more accessible for users who need higher contrast.
 - Additionally, the background has been **darkened** for a richer, more immersive coding experience.
 - It uses the structure of catpuccin theme and replaces the colors of maple dark only optimizing the bg color to be darker.

## Screenshots
<img width="1357" height="792" alt="image" src="https://github.com/user-attachments/assets/0cb793c9-6d5e-4938-90be-949a9d4081af" />

## Features

- Dark background optimized for long coding sessions
- WCAG AA compliant color contrast for readability
- Refined syntax highlighting for clarity
- Supports Zed editor theming

## Installation

### Local Theme (Quick Test)

1. Copy your theme JSON file (e.g., `maple-dark-pro.json`) to Zed’s themes directory:  
   - **Linux / macOS:** `~/.config/zed/themes/`  
   - **Windows:** `%USERPROFILE%\AppData\Roaming\Zed\themes\`  
2. Restart Zed.  
3. Open the Command Palette (`Ctrl‑K, Ctrl‑T`) → **Theme Selector: Toggle** → select your theme.

### Dev Extension (Iterative Development)

1. Make sure your extension folder includes:
    - extension.toml
    - themes/maple-dark-pro.json
2. Open Zed → **Command Palette → zed: install dev extension**.  
3. Select the directory containing your extension (`extension.toml`).  
4. The theme will now be available in the theme selector.  
5. After making changes, reload extensions with **zed: reload extensions**.  
6. Check logs via **zed: open log** for troubleshooting.  

## Credits

- Original inspiration: [Maple Theme for VS Code](https://github.com/subframe7536/vscode-theme-maple)  
- Tweaked and maintained by **[Abhilash26](https://github.com/abhilash26)** for WCAG AA compliance and darker background.

## License

MIT License
