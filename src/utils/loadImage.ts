export async function loadImageURL(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const elem = new Image();
    elem.crossOrigin = "Anonymous";
    elem.onload = () => resolve(elem);
    elem.onerror = reject;
    elem.src = url;
    return elem;
  });
}
