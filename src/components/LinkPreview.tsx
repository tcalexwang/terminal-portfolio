import React, { useEffect, useState } from "react";
import { getLinkPreview } from "link-preview-js";

type PreviewData = {
  title?: string;
  description?: string;
  image?: string;
  url: string;
};

export default function LinkPreview({ url }: { url: string }) {
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLinkPreview(url)
      .then((data) => {
        setPreview({
          title: data.title,
          description: data.description,
          image: data.images?.[0],
          url: url,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <div className="animate-pulse bg-[#313244] h-32 rounded-md"></div>;
  }

  if (!preview) return null;

  return (
    <div className="bg-[#313244] rounded-md overflow-hidden shadow-xl">
      <div className="flex">
        {preview.image && (
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={preview.image}
              alt={preview.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-3">
          <h4 className="font-bold text-sm mb-1">{preview.title}</h4>
          <p className="text-xs text-[#cdd6f4] line-clamp-2">
            {preview.description}
          </p>
          <p className="text-xs text-[#fab387] mt-1">{preview.url}</p>
        </div>
      </div>
    </div>
  );
}
