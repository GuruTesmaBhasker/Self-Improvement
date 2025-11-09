# Daily Motivator

A personal motivational website to help you stay focused and track your daily progress. Set morning goals and reflect each evening to build better habits and maintain consistency.

## Features

### 🌅 Morning Planning
- Set your top 3 tasks for the day
- Define one thing to avoid
- Auto-save as you type
- Time-based section prioritization

### 🌙 Evening Reflection
- Check off completed tasks
- Track focus levels (✅/❌)
- Note one improvement for tomorrow
- Review your morning goals

### 📊 Progress Tracking
- Total days tracked
- Task completion rate
- Focus consistency rate
- Data stored locally in your browser

## How to Use

1. **Open the website** - Simply open `index.html` in your web browser
2. **Morning (before 6 PM)** - Fill out your top 3 tasks and what to avoid
3. **Evening (after 6 PM)** - Reflect on your day and plan improvements
4. **Stay Consistent** - Use daily to build momentum and track progress

## Getting Started

### Option 1: Direct File Access
1. Download all files to a folder
2. Double-click `index.html` to open in your browser
3. Bookmark the page for quick daily access

### Option 2: Local Development Server
If you prefer a local server setup:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Features in Detail

### Smart Time-Based UI
- **Before 6 PM**: Morning section appears first for daily planning
- **After 6 PM**: Evening section appears first for reflection
- Automatic date display
- Responsive design for mobile and desktop

### Data Persistence
- All data saved locally using browser localStorage
- No external servers or accounts needed
- Data persists between sessions
- Each day creates a separate record

### Keyboard Shortcuts
- **Ctrl/Cmd + S**: Save current section (morning or evening)

### Auto-Save
- All inputs automatically save after 1 second of inactivity
- No need to manually save unless you want immediate confirmation

## File Structure

```
Daily-Motivator/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality and data management
└── README.md           # This documentation
```

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
- Morning section: `.morning-section` background
- Evening section: `.evening-section` background
- Progress section: `.progress-section` background

### Adding Features
The JavaScript is modular and well-commented. You can:
- Add new input fields
- Modify progress calculations
- Add data export functionality
- Integrate with external services

### Motivational Quotes
Daily rotating quotes are stored in the `motivationalQuotes` array in `script.js`. Add your own quotes to this array.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with localStorage support

## Privacy

- **100% Local**: All data stays on your device
- **No Tracking**: No analytics or external requests
- **Offline Ready**: Works without internet connection
- **Your Data**: You control all your information

## Tips for Success

1. **Be Specific**: Write clear, actionable tasks
2. **Stay Realistic**: Choose achievable daily goals
3. **Be Honest**: Accurate evening reflections help you improve
4. **Stay Consistent**: Daily use builds the most value
5. **Review Progress**: Check your stats weekly for motivation

## Troubleshooting

### Data Not Saving
- Ensure JavaScript is enabled in your browser
- Check if localStorage is available (not in incognito mode)
- Try refreshing the page

### Layout Issues
- Ensure you're using a modern browser
- Try zooming in/out or adjusting browser window size
- Clear browser cache if styles aren't loading

### Starting Fresh
If you want to clear all data:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage for this site
4. Or use the hidden `clearAllData()` method in console

## Future Enhancements

Potential features for future versions:
- Data export/import functionality
- Weekly/monthly progress reports
- Goal categories and tagging
- Habit tracking integration
- Team/family sharing options

## Contributing

This is a personal project, but suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Share customization ideas
- Contribute improvements

---

**Remember**: Every day is a new opportunity to be your best self 💪

Start each morning with intention, end each evening with reflection, and watch your consistency build over time!