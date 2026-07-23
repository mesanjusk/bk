'use client';

import { useEffect, useState } from 'react';
import AdminPageHeader from '../../../components/admin/ui/AdminPageHeader.jsx';
import AdminCard from '../../../components/admin/ui/AdminCard.jsx';
import MediaFrame from '../../../components/ui/MediaFrame.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { fetchSettings, updateSettings, uploadImage } from '../../../api/client.js';

export default function AdminSettingsPage() {
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
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Site Settings"
        description="Replace the homepage hero image or video. It appears immediately across the site."
      />

      <AdminCard>
        <p className="text-sm font-medium text-[#3c4043]">Hero media</p>

        {loading ? (
          <p className="mt-4 text-sm text-[#5f6368]">Loading…</p>
        ) : (
          <>
            <div className="mt-3 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-md border border-[#dadce0]">
              {settings?.heroMediaUrl ? (
                <MediaFrame type={settings.heroMediaType} src={settings.heroMediaUrl} alt="Hero media" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#f8f9fa] text-xs uppercase tracking-wide text-[#80868b]">
                  No media set
                </div>
              )}
            </div>

            <label className="mt-5 inline-block cursor-pointer rounded-md border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#3c4043] transition-colors hover:bg-[#f8f9fa]">
              {uploading ? 'Uploading…' : 'Upload Image or Video'}
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {saved && <p className="mt-3 text-sm text-[#188038]">Saved.</p>}
            {error && <p className="mt-3 text-sm text-[#d93025]">{error}</p>}
          </>
        )}
      </AdminCard>
    </div>
  );
}
