export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([\w\-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
