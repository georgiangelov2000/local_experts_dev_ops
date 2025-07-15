import { useTranslation } from 'react-i18next';

export default function VideosTab({ videos }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos?.length > 0 ? (
        videos.map((videoUrl, idx) => (
          <div key={idx} className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
            <iframe
              src={videoUrl}
              title={t('video_title', { number: idx + 1 })}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">{t('no_videos_available')}</p>
      )}
    </div>
  );
}
  