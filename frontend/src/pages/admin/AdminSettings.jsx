import { useEffect, useState } from 'react';
import Section from '../../components/ui/Section.jsx';
import MediaFrame from '../../components/ui/MediaFrame.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchSettings, updateSettings, uploadImage } from '../../api/client.js';

export default function AdminSettings() {
  const { token } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploading(true);
    setError('');
    setSaved(false);
    try {
      const { url, type } = await uploadImage(file, token);
      const updated = await updateSettings({ heroMediaType: type, heroMediaUrl: url }, token);
      setSettings(updated);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Section maxWidth="max-w-2xl">
      <h1 className="text-3xl font-semibold text-sage-900">Site Settings</h1>
      <p className="mt-2 text-sm text-sage-600">
        Replace the homepage hero image or video. It appears immediately across the site.
      </p>

      <div className="mt-10 rounded-xl2 bg-white p-8 shadow-soft">
        <p className="text-sm font-medium text-sage-700">Hero Media</p>

        {loading ? (
          <p className="mt-4 text-sm text-sage-500">Loading…</p>
        ) : (
          <>
            <div className="mt-3 aspect-[4/3] w-full max-w-sm">
              {settings?.heroMediaUrl ? (
                <MediaFrame type={settings.heroMediaType} src={settings.heroMediaUrl} alt="Hero media" />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-xl2 bg-sand text-xs uppercase tracking-wide text-sage-400 ring-1 ring-gold-400/30">
                  No media set
                </div>
              )}
            </div>

            <label className="mt-5 inline-block cursor-pointer rounded-full border border-sage-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50">
              {uploading ? 'Uploading…' : 'Upload Image or Video'}
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {saved && <p className="mt-3 text-xs text-sage-600">Saved.</p>}
            {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
          </>
        )}
      </div>
    </Section>
  );
}
