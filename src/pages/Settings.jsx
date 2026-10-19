import "./Settings.css";

export default function Settings({ settings, setSettings, defaults }) {
  const update = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <main className="settings">
      <h1>Settings</h1>

      <div className="setting-row">
        <label>Font</label>
        <select
          value={settings.font}
          onChange={(e) => update("font", e.target.value)}
        >
          <option value="Inter, sans-serif">Inter</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
        </select>
      </div>

      <div className="setting-row stacked">
        <label>Font scale: {settings.fontScale}</label>
        <input
          type="range"
          min="0.8"
          max="1.4"
          step="0.1"
          value={settings.fontScale}
          onChange={(e) => update("fontScale", Number(e.target.value))}
        />
      </div>

      <div className="setting-row">
        <label>Compact mode</label>
        <input
          type="checkbox"
          className="switch"
          checked={settings.compact}
          onChange={(e) => update("compact", e.target.checked)}
        />
      </div>

      <div className="setting-row">
        <label>Show resize handles</label>
        <input
          type="checkbox"
          className="switch"
          checked={settings.showHandles}
          onChange={(e) => update("showHandles", e.target.checked)}
        />
      </div>

      <button className="reset-btn" onClick={() => setSettings(defaults)}>
        Reset to default
      </button>
    </main>
  );
}